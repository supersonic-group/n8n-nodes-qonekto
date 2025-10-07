import {
	BINARY_ENCODING,
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
import type FormData from 'form-data';
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

	const fileContent: Buffer | Readable = Buffer.from(binaryData.data, BINARY_ENCODING);
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

	const credentials: {
		tenant: string;
		base_url: string;
	} = await this.getCredentials('qonektoApi');

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
		return await this.helpers.httpRequestWithAuthentication.call(this, 'qonektoApi', options);
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

type DataWithPagination = {
	data: [];
	next_page_url?: string | null;
	links?: {
		next: string | null;
	};
};

export async function qonektoApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	uri: string,
	method: IHttpRequestMethods = 'GET',
	headers: Record<string, string | number> = {},
	body: FormData | GenericValue | GenericValue[] | Buffer | URLSearchParams = {},
	query: IDataObject = {},
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];

	let responseData;

	query.per_page = 100;
	query.page = 0;

	do {
		query.page++;
		responseData = (await qonektoApiRequest.call(this, uri, method, headers, body, query, {
			json: true,
		})) as DataWithPagination;
		returnData.push.apply(returnData, responseData.data as IDataObject[]);
	} while (responseData.next_page_url || (responseData.links && responseData.links.next));

	return returnData;
}
