import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';
import Resources from './descriptions/Resources';
import Operations from './descriptions/Operations';
import Fields from './descriptions/Fields';
import { qonektoApiRequestAllItems } from './GenericFunctions';

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
			baseURL:
				'={{($env.QONEKTO_BASE_URL || "https://app.qonekto.de/api/") + $credentials.tenant}}',
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
}
