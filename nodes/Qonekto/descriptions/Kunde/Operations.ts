import { INodeProperties } from 'n8n-workflow';

export const Kunde: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
			},
		},
		options: [
			{
				name: 'List Kunden',
				value: 'List Kunden',
				action: 'List Kunden',
				description: 'List Kunden',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde',
					},
				},
			},
			{
				name: 'Create Kunde',
				value: 'Create Kunde',
				action: 'Create Kunde',
				description: 'Create Kunde',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde',
					},
				},
			},
			{
				name: 'Filter Kunden',
				value: 'Filter Kunden',
				action: 'Filter Kunden',
				description: 'Filter Kunden',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/filter',
					},
				},
			},
			{
				name: 'Upsert Kunde',
				value: 'Upsert Kunde',
				action: 'Upsert Kunde',
				description: 'Upsert Kunde',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/upsert',
					},
				},
			},
			{
				name: 'Show Kunde',
				value: 'Show Kunde',
				action: 'Show Kunde',
				description: 'Show Kunde',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}',
					},
				},
			},
			{
				name: 'Update Kunde',
				value: 'Update Kunde',
				action: 'Update Kunde',
				description: 'Update Kunde',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}',
					},
				},
			},
		],
		default: '',
	},
];

export default Kunde;
