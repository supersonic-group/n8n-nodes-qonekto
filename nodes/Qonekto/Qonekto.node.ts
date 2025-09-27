import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';
import Resources from './descriptions/Resources';
import Operations from './descriptions/Operations';
import Fields from './descriptions/Fields';

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
			baseURL: '={{"https://app.qonekto.de/api/" + $credentials.tenant}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		version: 20250926,

		properties: [...Resources, ...Operations, ...Fields],
	};
}
