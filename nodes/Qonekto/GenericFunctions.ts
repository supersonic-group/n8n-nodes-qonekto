import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	JsonObject,
	NodeApiError,
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
	body: FormData | GenericValue | GenericValue[] | Buffer | URLSearchParams = {},
	qs: IDataObject = {},
	mergeOptions: Omit<Partial<IHttpRequestOptions>, 'returnFullResponse'> = {},
): Promise<IN8nHttpResponse | Readable> {
	const response = await qonektoApiRequestFull.call(this, url, method, body, qs, mergeOptions);
	return response.body;
}

export async function qonektoApiRequestFull(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	url: string,
	method: IHttpRequestMethods = 'GET',
	body: FormData | GenericValue | GenericValue[] | Buffer | URLSearchParams = {},
	qs: IDataObject = {},
	mergeOptions: Partial<IHttpRequestOptions> = {},
): Promise<IN8nHttpFullResponse> {
	console.log('qonektoApiRequest', url, method, body, qs, mergeOptions);

	const credentials = await this.getCredentials('qonektoApi');
	const baseUrl = process.env.QONEKTO_BASE_URL || 'https://app.qonekto.de/api/';

	const options: IHttpRequestOptions = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		url: baseUrl + credentials.tenant + '/' + (url.startsWith('/') ? url.slice(1) : url),
		method,
		qs,
		body,
		json: true,
		returnFullResponse: true,
		...mergeOptions,
	};
	if (Object.keys(options.body as IDataObject).length === 0) {
		delete options.body;
	}
	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, 'qonektoApi', options);
	} catch (error) {
		console.error(error);
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

type DataWithPagination = {
	data: [];
	next_page_url: string | null;
};

export async function qonektoApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	uri: string,
	method: IHttpRequestMethods = 'GET',
	body: FormData | GenericValue | GenericValue[] | Buffer | URLSearchParams = {},
	query: IDataObject = {},
): Promise<IDataObject[]> {
	console.log('qonektoApiRequestAllItems', uri, method, body, query);
	const returnData: IDataObject[] = [];

	let responseData;

	query.per_page = 100;
	query.page = 0;

	do {
		query.page++;
		responseData = (await qonektoApiRequest.call(
			this,
			uri,
			method,
			body,
			query,
		)) as DataWithPagination;
		returnData.push.apply(returnData, responseData.data as IDataObject[]);
	} while (responseData.next_page_url !== null);

	return returnData;
}
