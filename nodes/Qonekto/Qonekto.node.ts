import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeListSearchItems,
	INodeListSearchResult,
	INodeParameterResourceLocator,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
	NodeOutput,
} from 'n8n-workflow';
import Resources from './descriptions/Resources';
import Operations from './descriptions/Operations';
import Fields from './descriptions/Fields';
import {
	buildMultipartBody,
	getItemBinaryData,
	qonektoApiRequest,
	qonektoApiRequestFull,
} from './GenericFunctions';
import { paginateAllPages } from './descriptions/Pagination';
import {
	IDEMPOTENCY_KEY_HEADER,
	IDEMPOTENCY_REPLAYED_FLAG,
	isReplayedResponse,
} from './descriptions/Idempotency';

async function makeListSearch(
	self: IExecuteFunctions | ILoadOptionsFunctions,
	uri: string,
	filter?: string,
	mapFn: (item: IDataObject) => INodeListSearchItems = (item) => ({
		name: (item.text || item.name || item.ameise_id) as string,
		value: item.ameise_id as string,
	}),
) {
	const items = (await qonektoApiRequest.call(self, uri)) as IDataObject[];
	return {
		results: items.map(mapFn).filter((item) => {
			if (filter !== undefined && filter !== null && filter.trim() !== '') {
				return (
					item.name.toLowerCase().includes(filter.toLowerCase()) ||
					('' + item.value).toLowerCase().includes(filter.toLowerCase())
				);
			}
			return true;
		}),
		paginationToken: undefined,
	};
}

export class Qonekto implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qonekto',
		name: 'qonekto',
		group: ['transform'],
		description: 'Interact with the Qonekto API',

		icon: 'file:qonekto.svg',

		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],

		credentials: [
			{
				name: 'qonektoApi',
				required: true,
				displayOptions: { show: { authentication: ['accessToken'] } },
			},
			{
				name: 'qonektoOAuth2Api',
				required: true,
				displayOptions: { show: { authentication: ['oAuth2'] } },
			},
		],
		subtitle:
			'={{$parameter["operation"] + ": /api/" + $credentials.tenant + "/" + $parameter["resource"]}}',
		defaults: {
			name: 'Qonekto',
		},
		requestDefaults: {
			baseURL: '={{$credentials.base_url + $credentials.tenant}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		// Runs only for an operation whose Return All resolved true; see descriptions/Pagination.ts.
		requestOperations: {
			pagination: paginateAllPages,
		},

		version: 20250926,

		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				default: 'accessToken',
				options: [
					{ name: 'API Token', value: 'accessToken' },
					{ name: 'OAuth2', value: 'oAuth2' },
				],
			},
			...Resources,
			...Operations,
			...Fields,
		],
	};

	methods = {
		listSearch: {
			async getAnreden(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				return makeListSearch(this, 'anreden', filter);
			},
			async getGesellschaften(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				return makeListSearch(this, 'gesellschaften', filter);
			},
			async getLaender(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				return makeListSearch(this, 'laender', filter);
			},
			async getRechtsformen(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				return makeListSearch(this, 'rechtsformen', filter);
			},
			async getSparten(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				return makeListSearch(this, 'sparten', filter);
			},
			async getStatus(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				return makeListSearch(this, 'status', filter);
			},
			async getVermittler(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				return makeListSearch(this, 'vermittler', filter);
			},
			async getZahlweisen(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				return makeListSearch(this, 'zahlweisen', filter);
			},

			async searchKunden(
				this: ILoadOptionsFunctions,
				filter?: string,
				paginationToken?: string,
			): Promise<INodeListSearchResult> {
				const response = (await qonektoApiRequest.call(
					this,
					'/kunde',
					'GET',
					{},
					{},
					{
						search: filter,
						page: paginationToken ? parseInt(paginationToken) : 1,
					},
				)) as {
					data: {
						ameise_id: number;
						nachname: string;
						vorname: string;
						vermittler_id: string;
					}[];
					meta: { current_page: number; last_page: number };
				};

				return {
					results: response.data.map(
						(item): INodeListSearchItems => ({
							name: (item.vorname + ' ' + item.nachname).trim() + ' (#' + item.ameise_id + ')',
							value: item.ameise_id,
							description:
								'Customer number: ' + item.ameise_id + ' • Broker: ' + item.vermittler_id,
							url: 'https://maklerinfo.biz/maklerportal/?show=kunde&kunde=' + item.ameise_id,
						}),
					),
					paginationToken:
						response.meta.current_page < response.meta.last_page
							? (response.meta.current_page + 1).toString()
							: undefined,
				};
			},
		},
	};

	customOperations = {
		Kunde: {
			async ['Upload File'](this: IExecuteFunctions): Promise<NodeOutput> {
				const items = this.getInputData();
				const returnData: INodeExecutionData[] = [];

				for (let i = 0; i < items.length; i++) {
					try {
						const parts: Parameters<typeof buildMultipartBody>[0] = [
							{ name: 'Typ', value: 'dokument' },
						];

						const optional = this.getNodeParameter('optional fields', i) as Record<string, string>;

						const datum = optional.datum || this.getNodeParameter('datum', i, '') as string;
						if (datum) {
							const date = new Date(datum);
							date.setUTCMilliseconds(0);
							parts.push({ name: 'datum', value: date.toISOString().replace('.000Z', '+00:00') });
						}

						const vertrags_id = optional.vertrags_id || this.getNodeParameter('vertrags_id', i, '') as string;
						if (vertrags_id) {
							parts.push({ name: 'zuordnung[vertrags_id]', value: vertrags_id });
						}

						const sparte_id = optional.sparte_id || this.getNodeParameter('sparte_id', i, '') as string;
						if (sparte_id) {
							parts.push({ name: 'zuordnung[sparte_id]', value: sparte_id });
						}

						const kundensichtbar = optional.kundensichtbar || this.getNodeParameter('kundensichtbar', i, '') as string;
						parts.push({ name: 'meta[kundensichtbar]', value: JSON.stringify(!!kundensichtbar) });

						const tagsJson = optional.tags ||this.getNodeParameter('tags', i, '') as string;
						if (tagsJson) {
							let tags: string[] = [];
							try {
								tags = JSON.parse(tagsJson);
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
							} catch (e) {
								tags = tagsJson.split(',');
							}
							for (const tag of tags) {
								parts.push({ name: 'tags[]', value: tag });
							}
						}

						const inputDataFieldName = this.getNodeParameter('file', i) as string;
						const { fileContent, originalFilename, mimeType } = await getItemBinaryData.call(
							this,
							inputDataFieldName,
							i,
						);

						const betreff = this.getNodeParameter('betreff', i, '') as string;
						parts.push({ name: 'betreff', value: betreff || originalFilename || '' });
						parts.push({
							name: 'file',
							value: fileContent,
							filename: betreff || originalFilename || '',
							contentType: mimeType,
						});
						const multipart = buildMultipartBody(parts);

						const ameise_id = this.getNodeParameter('kunde_ameise_id', i) as INodeParameterResourceLocator;

						// A custom operation never reaches the declarative Idempotency-Key or the
						// replay marker, so this one carries both itself. It posts to the same
						// idempotency-protected route as Create File.
						const headers: Record<string, string | number> = {
							'Content-Type': multipart.contentType,
							'Content-Length': multipart.body.length,
						};
						const idempotencyKey = String(
							this.getNodeParameter('idempotencyKey', i, '') ?? '',
						).trim();
						if (idempotencyKey !== '') {
							headers[IDEMPOTENCY_KEY_HEADER] = idempotencyKey;
						}

						const response = await qonektoApiRequestFull.call(
							this,
							'kunde/' + ameise_id.value + '/archiveintrag',
							'POST',
							headers,
							multipart.body,
							{},
							{
								json: false,
							},
							1,
						);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(response.body as IDataObject[]),
							{ itemData: { item: i } },
						);
						if (isReplayedResponse(response.headers)) {
							for (const item of executionData) {
								item.json[IDEMPOTENCY_REPLAYED_FLAG] = true;
							}
						}
						returnData.push(...executionData);
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({ json: { error: error.message } });
							continue;
						}
						throw error instanceof NodeApiError
							? error
							: new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
					}
				}

				return [returnData];
			},
		},
	};
}
