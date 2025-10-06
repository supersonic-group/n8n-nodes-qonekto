// TODO: rewrite based on https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Gitlab/GitlabTrigger.node.ts
import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
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
import FormData from 'form-data';

async function makeLoadOptions(
	self: IExecuteFunctions | ILoadOptionsFunctions,
	uri: string,
	mapFn: (item: IDataObject) => INodePropertyOptions = (item) => ({
		name: (item.text || item.name || item.ameise_id) as string,
		value: item.ameise_id as string,
	}),
): Promise<INodePropertyOptions[]> {
	const items = await qonektoApiRequestAllItems.call(self, uri);
	return [{ name: '', value: '' }, ...items.map(mapFn)];
}

export class Qonekto implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qonekto Trigger',
		name: 'qonektoTrigger',
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
		loadOptions: {
			async getAnreden(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return makeLoadOptions(this, 'anreden');
			},
			async getGesellschaften(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return makeLoadOptions(this, 'gesellschaften');
			},
			async getLaender(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return makeLoadOptions(this, 'laender');
			},
			async getRechtsformen(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return makeLoadOptions(this, 'rechtsformen');
			},
			async getSparten(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return makeLoadOptions(this, 'sparten');
			},
			async getStatus(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return makeLoadOptions(this, 'status');
			},
			async getVermittler(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return makeLoadOptions(this, 'vermittler');
			},
			async getZahlweisen(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return makeLoadOptions(this, 'zahlweisen');
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
						multiPartBody.append('file', fileContent, {
							contentType: mimeType,
							knownLength: contentLength,
							filename: betreff || originalFilename,
						});

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
