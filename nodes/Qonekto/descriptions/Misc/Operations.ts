import { INodeProperties } from 'n8n-workflow';

export const Misc: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Misc'],
			},
		},
		options: [
			{
				name: 'Who Am I',
				value: 'Who Am I',
				action: 'Who am i',
				description: 'Who Am I?',
				routing: {
					request: {
						method: 'GET',
						url: '=/whoami',
					},
				},
			},
		],
		default: 'Who Am I',
	},
];

export default Misc;
