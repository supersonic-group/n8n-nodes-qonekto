import { INodeProperties } from 'n8n-workflow';

export const KundeAdditionalAddresses: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
			},
		},
		options: [
			{
				name: 'List Customer Additional Addresses',
				value: 'List Customer Additional Addresses',
				action: 'List customer additional addresses',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/additional-addresses',
					},
				},
			},
			{
				name: 'Create Customer Additional Address',
				value: 'Create Customer Additional Address',
				action: 'Create customer additional address',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/additional-addresses',
					},
				},
			},
			{
				name: 'Update Customer Additional Address',
				value: 'Update Customer Additional Address',
				action: 'Update customer additional address',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/additional-addresses/{{$parameter["address"]}}',
					},
				},
			},
			{
				name: 'Delete Customer Additional Address',
				value: 'Delete Customer Additional Address',
				action: 'Delete customer additional address',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/additional-addresses/{{$parameter["address"]}}',
					},
				},
			},
		],
		default: 'List Customer Additional Addresses',
	},
];

export default KundeAdditionalAddresses;
