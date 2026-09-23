import {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	JsonObject,
	NodeApiError,
	NodeOperationError,
	sleep,
} from 'n8n-workflow';
import type { URLSearchParams } from 'url';
import {
	GenericValue,
	IN8nHttpFullResponse,
	IN8nHttpResponse,
} from 'n8n-workflow/dist/esm/interfaces';
import type { Readable } from 'stream';

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
	const contentLength: number = fileContent.length;
	const originalFilename: string | undefined = binaryData.fileName;
	const mimeType = binaryData.mimeType;

	return {
		fileContent,
		contentLength,
		originalFilename,
		mimeType,
	};
}

export async function qonektoApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	url: string,
	method: IHttpRequestMethods = 'GET',
	headers: Record<string, string | number> = {},
	body: FormData | GenericValue | GenericValue[] | Buffer | URLSearchParams = {},
	qs: IDataObject = {},
	mergeOptions: Omit<Partial<IHttpRequestOptions>, 'returnFullResponse'> = {},
	maxRetries: number = 3,
	retryCount: number = 1,
): Promise<IN8nHttpResponse | Readable> {
	const response = await qonektoApiRequestFull.call(
		this,
		url,
		method,
		headers,
		body,
		qs,
		mergeOptions,
		retryCount,
		maxRetries,
	);
	return response.body;
}

export async function qonektoApiRequestFull(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	url: string,
	method: IHttpRequestMethods = 'GET',
	headers: Record<string, string | number> = {},
	body: FormData | GenericValue | GenericValue[] | Buffer | URLSearchParams = {},
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
		console.error(error);
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
