import { INodeProperties } from 'n8n-workflow';

export const Panda: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Panda'],
			},
		},
		options: [
			{
				name: 'Get All Customer Links',
				value: 'Get All Customer Links',
				action: 'Get all customer Links',
				description:
					'Retrieves all customer links created by the currently logged-in broker that have not been processed yet.',
				routing: {
					request: {
						method: 'GET',
						url: '=/panda/customer-links',
					},
				},
			},
			{
				name: 'Create A Customer Link',
				value: 'Create A Customer Link',
				action: 'Create a customer link',
				description:
					'If customer link for given params already exists, it will be disabled and new link will be created',
				routing: {
					request: {
						method: 'POST',
						url: '=/panda/customer-links',
					},
				},
			},
			{
				name: 'Get Active Tenders For A Customer',
				value: 'Get Active Tenders For A Customer',
				action: 'Get active tenders for a customer',
				description: 'Retrieves all active tenders for a customer',
				routing: {
					request: {
						method: 'GET',
						url: '=/panda/tenders',
					},
				},
			},
			{
				name: 'Create A Tender',
				value: 'Create A Tender',
				action: 'Create a tender',
				description: 'Create a tender',
				routing: {
					request: {
						method: 'POST',
						url: '=/panda/tenders',
					},
				},
			},
			{
				name: 'Imports An Ameise Customer Into Panda',
				value: 'Imports An Ameise Customer Into Panda',
				action: 'Imports an Ameise customer into Panda',
				description: 'Imports an Ameise customer into Panda',
				routing: {
					request: {
						method: 'POST',
						url: '=/panda/customers/{{$parameter["ameiseId"]}}/import',
					},
				},
			},
		],
		default: '',
	},
];

export default Panda;
