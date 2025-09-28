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
				action: 'List kunden',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde',
					},
				},
			},
			{
				name: 'Filter Kunden',
				value: 'Filter Kunden',
				action: 'Filter kunden',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/filter',
					},
				},
			},
			{
				name: 'Create Kunde',
				value: 'Create Kunde',
				action: 'Create kunde',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde',
					},
				},
			},
			{
				name: 'Show Kunde',
				value: 'Show Kunde',
				action: 'Show kunde',
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
				action: 'Update kunde',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}',
					},
				},
			},
			{
				name: 'Upsert Kunde',
				value: 'Upsert Kunde',
				action: 'Upsert kunde',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/upsert',
					},
				},
			},
			{
				name: 'Upload File',
				value: 'Upload File',
				action: 'Upload file',
				description: 'Upload provided file to Kontakthistorie',
			},
			{
				name: 'Create File',
				value: 'Create File',
				action: 'Create file',
				description: 'Create file with provided content in Kontakthistorie',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/archiveintrag',
					},
				},
			},
		],
		default: 'List Kunden',
	},
];

export default Kunde;
