import { INodeTypeBaseDescription, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';

export const BASE_DESCRIPTION: INodeTypeBaseDescription = {
	displayName: 'Qonekto',
	name: 'qonekto',
	group: ['transform'],
	description: 'Interact with the Qonekto API',
};

export const NODE_DESCRIPTION: Omit<INodeTypeDescription, 'version' | 'properties'> = {
	...BASE_DESCRIPTION,
	icon: { light: 'file:qonekto.svg', dark: 'file:qonekto.dark.svg' },

	usableAsTool: true,
	inputs: [NodeConnectionTypes.Main],
	outputs: [NodeConnectionTypes.Main],

	credentials: [{ name: 'qonektoApi', required: true }],
	subtitle:
		'={{$parameter["operation"] + ": /api/" + $credentials.tenant + "/" + $parameter["resource"]}}',
	defaults: {
		name: '={{"Qonekto (" + $credentials.tenant + ")"}}',
	},
	requestDefaults: {
		baseURL: '={{"https://app.qonekto.de/api/" + $credentials.tenant}}',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	},
};
