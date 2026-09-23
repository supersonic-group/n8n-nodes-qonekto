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
				name: 'Create Customer',
				value: 'Create Kunde',
				action: 'Create customer',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde',
					},
				},
			},
			{
				name: 'Create File',
				value: 'Create File',
				action: 'Create file',
				description: 'Create a file with the provided content in the customer\'s contact history',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/archiveintrag',
					},
				},
			},
			{
				name: 'Create or Update Customer',
				value: 'Upsert Kunde',
				action: 'Create or update customer',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/upsert',
					},
				},
			},
			{
				name: 'Filter Customers',
				value: 'Filter Kunden',
				action: 'Filter customers',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/filter',
					},
				},
			},
			{
				name: 'Get Customer',
				value: 'Show Kunde',
				action: 'Get customer',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}',
					},
				},
			},
			{
				name: 'List Archive Entries',
				value: 'List Archive Entries',
				action: 'List archive entries',
				description:
					'List the archive entries in a customer\'s contact history. Whether an entry has downloadable content is only known at download time.',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/archiveintrag',
					},
				},
			},
			{
				name: 'List Customers',
				value: 'List Kunden',
				action: 'List customers',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde',
					},
				},
			},
			{
				name: 'Update Customer',
				value: 'Update Kunde',
				action: 'Update customer',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}',
					},
				},
			},
			{
				name: 'Upload File',
				value: 'Upload File',
				action: 'Upload file',
				description: 'Upload the provided file to the customer\'s contact history',
			},
		],
		default: 'List Kunden',
	},
];

export default Kunde;
