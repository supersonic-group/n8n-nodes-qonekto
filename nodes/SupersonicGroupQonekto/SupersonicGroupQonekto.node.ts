import { NodeConnectionType, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';

export class SupersonicGroupQonekto implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Supersonic Group Qonekto',
		name: 'supersonicGroupQonekto',
		icon: { light: 'file:supersonicGroupQonekto.svg', dark: 'file:supersonicGroupQonekto.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Supersonic Group Qonekto API',
		defaults: {
			name: 'Supersonic Group Qonekto',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [{ name: 'supersonicGroupQonektoApi', required: true }],
		requestDefaults: {
			baseURL: 'https://app.qonekto.de/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Company',
						value: 'company',
					},
				],
				default: 'user',
			},
			...userDescription,
			...companyDescription,
		],
	};
}
