import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
	NodeOutput,
} from 'n8n-workflow';
import Resources from './descriptions/Resources';
import Operations from './descriptions/Operations';
import Fields from './descriptions/Fields';
import {
	getItemBinaryData,
	qonektoApiRequest,
	qonektoApiRequestAllItems,
} from './GenericFunctions';
import { INodeListSearchItems } from 'n8n-workflow/dist/esm/interfaces';

async function makeListSearch(
	self: IExecuteFunctions | ILoadOptionsFunctions,
	uri: string,
	filter?: string,
	mapFn: (item: IDataObject) => INodeListSearchItems = (item) => ({
		name: (item.text || item.name || item.ameise_id) as string,
		value: item.ameise_id as string,
	}),
) {
	const items = await qonektoApiRequestAllItems.call(self, uri);
	return {
		results: [{ name: '', value: '' }, ...items.map(mapFn)].filter((item) => {
			if (filter !== undefined && filter !== null && filter.trim() !== '') {
				return (
					item.name.toLowerCase().includes(filter.toLowerCase()) ||
					('' + item.value).toLowerCase().includes(filter.toLowerCase())
				);
			}
			return true;
		}),
		paginationToken: null,
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

		credentials: [{ name: 'qonektoApi', required: true }],
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

		version: 20250926,

		properties: [...Resources, ...Operations, ...Fields],
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
							name: (item.nachname + ' ' + item.vorname).trim() + ' (#' + item.ameise_id + ')',
							value: item.ameise_id,
							description:
								'Kundennummer: ' + item.ameise_id + ' • Vermittler: ' + item.vermittler_id,
							url: 'https://maklerinfo.biz/maklerportal/?show=kunde&kunde=' + item.ameise_id,
						}),
					),
					paginationToken:
						response.meta.current_page < response.meta.last_page
							? (response.meta.current_page + 1).toString()
							: null,
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
						const multiPartBody = new FormData();
						multiPartBody.append('typ', 'dokument');

						const datum = this.getNodeParameter('datum', i) as string;
						if (datum) {
							const date = new Date(datum);
							date.setUTCMilliseconds(0);
							multiPartBody.append('datum', date.toISOString().replace('.000Z', '+00:00'));
						}

						const vertrags_id = this.getNodeParameter('vertrags_id', i) as string;
						if (vertrags_id) {
							multiPartBody.append('zuordnung[vertrags_id]', vertrags_id);
						}

						const sparte_id = this.getNodeParameter('sparte_id', i) as string;
						if (sparte_id) {
							multiPartBody.append('zuordnung[sparte_id]', sparte_id);
						}

						const kundensichtbar = this.getNodeParameter('kundensichtbar', i) as string;
						multiPartBody.append('meta[kundensichtbar]', JSON.stringify(kundensichtbar));

						const tagsJson = this.getNodeParameter('tags', i) as string;
						if (tagsJson) {
							let tags: string[] = [];
							try {
								tags = JSON.parse(tagsJson);
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
							} catch (e) {
								tags = tagsJson.split(',');
							}
							for (const tag of tags) {
								multiPartBody.append('tags[]', tag);
							}
						}

						const inputDataFieldName = this.getNodeParameter('file', i) as string;
						const { contentLength, fileContent, originalFilename, mimeType } =
							await getItemBinaryData.call(this, inputDataFieldName, i);

						const betreff = this.getNodeParameter('betreff', i) as string;
						multiPartBody.append('betreff', betreff || originalFilename);
						// @ts-expect-error FormData should be imported from 'form-data',
						// but the import is not allowed in n8n but should still work.
						multiPartBody.append('file', fileContent, {
							contentType: mimeType,
							knownLength: contentLength,
							filename: betreff || originalFilename,
						} as string);

						const response = await qonektoApiRequest.call(
							this,
							'kunde/' + this.getNodeParameter('kunde_ameise_id', i) + '/archiveintrag',
							'POST',
							{},
							multiPartBody,
							{},
							{
								json: false,
							},
							1,
						);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(response as IDataObject[]),
							{ itemData: { item: i } },
						);
						returnData.push(...executionData);
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({ json: { error: error.message } });
							continue;
						}
						throw error;
					}
				}

				return [returnData];
			},
		},
	};
}
