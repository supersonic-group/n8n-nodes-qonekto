import { INodeProperties } from 'n8n-workflow';

export const KundeTag: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Kunden-Tag'],
			},
		},
		options: [
			{
				name: 'List Kunde Tags',
				value: 'List Kunde Tags',
				action: 'List kunde tags',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/tags',
					},
				},
			},
			{
				name: 'Set Kunde Tags',
				value: 'Set Kunde Tags',
				action: 'Set kunde tags',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/tags',
					},
				},
			},
			{
				name: 'Add Kunde Tags',
				value: 'Add Kunde Tags',
				action: 'Add kunde tags',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/tags',
					},
				},
			},
			{
				name: 'Remove Kunde Tags',
				value: 'Remove Kunde Tags',
				action: 'Remove kunde tags',
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

export default KundeTag;
