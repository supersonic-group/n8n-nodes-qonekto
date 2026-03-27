import { INodeProperties } from 'n8n-workflow';

export const KundeNotifications: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['KundeNotifications'],
			},
		},
		options: [
			{
				name: 'Send Customer Notification',
				value: 'Send Customer Notification',
				action: 'Send customer notification',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/notifications',
					},
				},
			},
		],
		default: 'Send Customer Notification',
	},
];

export default KundeNotifications;
