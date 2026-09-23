import { randomBytes } from 'crypto';
import {
	GenericValue,
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	IN8nHttpFullResponse,
	JsonObject,
	NodeApiError,
	NodeOperationError,
	sleep,
} from 'n8n-workflow';

type MultipartPart =
	| { name: string; value: string }
	| { name: string; value: Buffer; filename: string; contentType?: string };

/**
 * Encodes a multipart/form-data body. n8n Cloud forbids importing `form-data`, and this
 * produces the same bytes it did, so the archive entry endpoint sees an unchanged request.
 */
export function buildMultipartBody(parts: MultipartPart[]): {
	body: Buffer;
	contentType: string;
} {
	const boundary = '--------------------------' + randomBytes(12).toString('hex');
	const quote = (s: string) => s.replace(/"/g, '%22').replace(/[\r\n]/g, ' ');
	const chunks: Buffer[] = [];
	for (const part of parts) {
		let header = `--${boundary}\r\nContent-Disposition: form-data; name="${quote(part.name)}"`;
		let value: Buffer;
		if ('filename' in part) {
			header += `; filename="${quote(part.filename)}"`;
			header += `\r\nContent-Type: ${part.contentType || 'application/octet-stream'}`;
			value = part.value;
		} else {
			// Parameters typed as string can hold numbers at runtime (an ID from an expression, a
			// parsed tag), and Buffer.from(number) allocates that many zero bytes instead.
			value = Buffer.from(String(part.value));
		}
		chunks.push(Buffer.from(header + '\r\n\r\n'), value, Buffer.from('\r\n'));
	}
	chunks.push(Buffer.from(`--${boundary}--\r\n`));
	return {
		body: Buffer.concat(chunks),
		contentType: `multipart/form-data; boundary=${boundary}`,
	};
}

export async function getItemBinaryData(
	this: IExecuteFunctions,
	inputDataFieldName: string,
	i: number,
) {
	if (!inputDataFieldName) {
		throw new NodeOperationError(
			this.getNode(),
			'The name of the input field containing the binary file data must be set',
			{
				itemIndex: i,
			},
		);
	}
	const binaryData = this.helpers.assertBinaryData(i, inputDataFieldName);

	const fileContent: Buffer = await this.helpers.getBinaryDataBuffer(
		i,
		inputDataFieldName,
	);
	const originalFilename: string | undefined = binaryData.fileName;
	const mimeType = binaryData.mimeType;

	return {
		fileContent,
		originalFilename,
		mimeType,
	};
}

export async function qonektoApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	url: string,
	method: IHttpRequestMethods = 'GET',
	headers: Record<string, string | number> = {},
	body: GenericValue | GenericValue[] | Buffer = {},
	qs: IDataObject = {},
	mergeOptions: Omit<Partial<IHttpRequestOptions>, 'returnFullResponse'> = {},
	maxRetries: number = 3,
	retryCount: number = 1,
): Promise<IN8nHttpFullResponse['body']> {
	const response = await qonektoApiRequestFull.call(
		this,
		url,
		method,
		headers,
		body,
		qs,
		mergeOptions,
		maxRetries,
		retryCount,
	);
	return response.body;
}

export async function qonektoApiRequestFull(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	url: string,
	method: IHttpRequestMethods = 'GET',
	headers: Record<string, string | number> = {},
	body: GenericValue | GenericValue[] | Buffer = {},
	qs: IDataObject = {},
	mergeOptions: Partial<IHttpRequestOptions> = {},
	maxRetries: number = 3,
	retryCount: number = 1,
): Promise<IN8nHttpFullResponse> {
	retryCount = Math.max(Math.min(1, maxRetries), retryCount);

	// Evaluated like the declarative routing does it, so an expression-valued selector picks the same
	// credential on both paths. Only the execute context takes an item index.
	const authentication =
		'getInputData' in this
			? this.getNodeParameter('authentication', 0, 'accessToken')
			: this.getNodeParameter('authentication', 'accessToken');
	const credentialType = authentication === 'oAuth2' ? 'qonektoOAuth2Api' : 'qonektoApi';

	const credentials: {
		tenant: string;
		base_url: string;
	} = await this.getCredentials(credentialType);

	const options: IHttpRequestOptions = {
		headers: {
			Accept: 'application/json',
			...headers,
		},
		url,
		method,
		qs,
		body,
		returnFullResponse: true,
		baseURL: credentials.base_url + credentials.tenant + '/',
		...mergeOptions,
	};
	if (Object.keys(options.body as IDataObject).length === 0) {
		delete options.body;
	}
	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
	} catch (error) {
		if (error.httpCode === '429' && retryCount < maxRetries) {
			await sleep(1000 * (retryCount + 1));
			return await qonektoApiRequestFull.call(
				this,
				url,
				method,
				headers,
				body,
				qs,
				mergeOptions,
				maxRetries,
				retryCount + 1,
			);
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
