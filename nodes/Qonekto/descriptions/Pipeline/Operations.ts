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
				action: 'Trigger pipeline import from crm',
				routing: {
					request: {
						method: 'GET',
						url: '=/pipeline/{{$parameter["pipeline_id"]}}/trigger-from-crm',
					},
				},
			},
		],
		default: 'Trigger Pipeline Import From CRM',
	},
];

export default Pipeline;
