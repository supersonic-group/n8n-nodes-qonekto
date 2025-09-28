import { INodeProperties } from 'n8n-workflow';

export const Resources: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Kunde',
				value: 'Kunde',
			},
			{
				name: 'Listen',
				value: 'Listen',
			},
			{
				name: 'Panda',
				value: 'Panda',
			},
			{
				name: 'Pipeline',
				value: 'Pipeline',
			},
			{
				name: 'Misc',
				value: 'Misc',
			},
		],
		default: 'Kunde',
	},
];

export default Resources;
