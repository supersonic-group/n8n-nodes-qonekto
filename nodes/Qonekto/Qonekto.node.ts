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

// The archive entry endpoint's limit: `file` is `max:10240` (KB) in mvp-connector's KundeArchivRequest.
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

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

		// 20260925 turned the Kunde timestamp filters into text fields; see descriptions/Kunde/Fields.ts.
		version: [20250926, 20260925],

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
							{ field: 'typ', value: 'dokument' },
						];

						const optional = this.getNodeParameter('optional fields', i) as Record<string, string>;

						const datum = optional.datum || this.getNodeParameter('datum', i, '') as string;
						if (datum) {
							const date = new Date(datum);
							date.setUTCMilliseconds(0);
							parts.push({ field: 'datum', value: date.toISOString().replace('.000Z', '+00:00') });
						}

						const vertrags_id = optional.vertrags_id || this.getNodeParameter('vertrags_id', i, '') as string;
						if (vertrags_id) {
							parts.push({ field: 'zuordnung[vertrags_id]', value: vertrags_id });
						}

						// A resource locator in the collection; a legacy top-level value may be a plain string.
						const sparte = (optional.sparte_id || this.getNodeParameter('sparte_id', i, '')) as
							| string
							| INodeParameterResourceLocator;
						const sparte_id = typeof sparte === 'object' ? String(sparte.value ?? '') : sparte;
						if (sparte_id) {
							parts.push({ field: 'zuordnung[sparte_id]', value: sparte_id });
						}

						const kundensichtbar = optional.kundensichtbar || this.getNodeParameter('kundensichtbar', i, '') as string;
						parts.push({ field: 'meta[kundensichtbar]', value: JSON.stringify(!!kundensichtbar) });

						const tagsJson = optional.tags || this.getNodeParameter('tags', i, '') as string;
						if (tagsJson) {
							let tags: string[] = [];
							try {
								tags = JSON.parse(tagsJson);
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
							} catch (e) {
								tags = tagsJson.split(',');
							}
							for (const tag of tags) {
								parts.push({ field: 'tags[]', value: tag });
							}
						}

						const inputDataFieldName = this.getNodeParameter('file', i) as string;
						const { fileContent, originalFilename, mimeType } = await getItemBinaryData.call(
							this,
							inputDataFieldName,
							i,
						);
						if (fileContent.length > MAX_UPLOAD_BYTES) {
							const megabytes = Math.round((fileContent.length / 1024 / 1024) * 10) / 10;
							throw new NodeOperationError(
								this.getNode(),
								`The file is ${megabytes} MB; Qonekto accepts files up to 10 MB`,
								{ itemIndex: i },
							);
						}

						const betreff = this.getNodeParameter('betreff', i, '') as string;
						if (!betreff && !originalFilename) {
							throw new NodeOperationError(
								this.getNode(),
								'Set a Subject: the file has no name to use as one',
								{ itemIndex: i },
							);
						}
						parts.push({ field: 'betreff', value: betreff || originalFilename || '' });
						parts.push({
							field: 'file',
							value: fileContent,
							// Ameise takes the stored file's extension from this name; the subject has none.
							filename: originalFilename || betreff || '',
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
