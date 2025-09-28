import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	JsonObject,
	NodeApiError,
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

export async function qonektoApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	url: string,
	method: IHttpRequestMethods = 'GET',
	headers: Record<string, string> = {},
	body: FormData | GenericValue | GenericValue[] | Buffer | URLSearchParams = {},
	qs: IDataObject = {},
	mergeOptions: Omit<Partial<IHttpRequestOptions>, 'returnFullResponse'> = {},
	retryCount: number = 0,
	maxRetries: number = 3,
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
	this: IExecuteFunctions | ILoadOptionsFunctions,
	url: string,
	method: IHttpRequestMethods = 'GET',
	headers: Record<string, string> = {},
	body: FormData | GenericValue | GenericValue[] | Buffer | URLSearchParams = {},
	qs: IDataObject = {},
	mergeOptions: Partial<IHttpRequestOptions> = {},
	retryCount: number = 0,
	maxRetries: number = 3,
): Promise<IN8nHttpFullResponse> {
	console.log(
		'qonektoApiRequest',
		url,
		method,
		headers,
		body,
		qs,
		mergeOptions,
		retryCount,
		maxRetries,
	);

	const credentials = await this.getCredentials('qonektoApi');
	const baseUrl = process.env.QONEKTO_BASE_URL || 'https://app.qonekto.de/api/';

	const options: IHttpRequestOptions = {
		headers: {
			Accept: 'application/json',
			...headers,
		},
		url: baseUrl + credentials.tenant + '/' + (url.startsWith('/') ? url.slice(1) : url),
		method,
		qs,
		body,
		returnFullResponse: true,
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
				retryCount + 1,
				maxRetries,
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
	this: IExecuteFunctions | ILoadOptionsFunctions,
	uri: string,
	method: IHttpRequestMethods = 'GET',
	headers: Record<string, string> = {},
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
