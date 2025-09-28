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
	return items.map(mapFn);
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
				return makeLoadOptions(this, 'rechtsformen');
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

						const inputDataFieldName = this.getNodeParameter('file', i) as string;
						const { contentLength, fileContent, mimeType } = await getItemBinaryData.call(
							this,
							inputDataFieldName,
							i,
						);

						const betreff = this.getNodeParameter('betreff', i) as string;
						multiPartBody.append('betreff', betreff);
						multiPartBody.append('file', fileContent, {
							contentType: mimeType,
							knownLength: contentLength,
							filename: betreff,
						});

						const response = await qonektoApiRequest.call(
							this,
							// 'kunde/' + this.getNodeParameter('kunde_ameise_id', i) + '/archiveintrag',
							'https://webhook.site/6b4e5782-d916-4012-b0c4-8e151387f1c8',
							'POST',
							{
								'Content-Type': `multipart/related; boundary=${multiPartBody.getBoundary()}`,
								'Content-Length': multiPartBody.getLengthSync(),
							},
							multiPartBody.getBuffer(),
							{},
							{
								json: false,
							},
							0,
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
