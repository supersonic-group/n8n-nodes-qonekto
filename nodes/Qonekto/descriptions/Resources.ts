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
				description: '',
			},
			{
				name: 'Listen',
				value: 'Listen',
				description: '',
			},
			{
				name: 'Panda',
				value: 'Panda',
				description: '',
			},
			{
				name: 'Pipeline',
				value: 'Pipeline',
				description: '',
			},
			{
				name: 'Misc',
				value: 'Misc',
				description: '',
			},
		],
		default: '',
	},
];

export default Resources;
