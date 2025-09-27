import { INodeProperties } from 'n8n-workflow';

export const Pipeline: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Pipeline'],
			},
		},
		options: [
			{
				name: 'Trigger Pipeline Import From CRM',
				value: 'Trigger Pipeline Import From CRM',
				action: 'Trigger Pipeline Import From CRM',
				description: 'Trigger Pipeline Import From CRM',
				routing: {
					request: {
						method: 'GET',
						url: '=/pipeline/{{$parameter["pipeline_id"]}}/trigger-from-crm',
					},
				},
			},
		],
		default: '',
	},
];

export default Pipeline;
