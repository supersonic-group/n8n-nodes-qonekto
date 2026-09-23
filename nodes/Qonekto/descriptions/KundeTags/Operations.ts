import { INodeProperties } from 'n8n-workflow';

export const KundeTags: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['KundeTags'],
			},
		},
		options: [
			{
				name: 'List Customer Tags',
				value: 'List Kunde Tags',
				action: 'List customer tags',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/tags',
					},
				},
			},
			{
				name: 'Set Customer Tags',
				value: 'Set Kunde Tags',
				action: 'Set customer tags',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/tags',
					},
				},
			},
			{
				name: 'Add Customer Tags',
				value: 'Add Kunde Tags',
				action: 'Add customer tags',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/tags',
					},
				},
			},
			{
				name: 'Remove Customer Tags',
				value: 'Remove Kunde Tags',
				action: 'Remove customer tags',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/tags',
					},
				},
			},
		],
		default: 'List Kunde Tags',
	},
];

export default KundeTags;
