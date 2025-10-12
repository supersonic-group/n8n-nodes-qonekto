import { INodeProperties } from 'n8n-workflow';

export const Fields: INodeProperties[] = [
	{
		displayName: 'Optional Pagination',
		name: 'optional pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Per Page',
				name: 'per_page',
				description: 'Enables Pagination and returns results paginated by given per_page',
				default: 100,
				type: 'number',
				routing: {
					send: {
						type: 'query',
						property: 'per_page',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				description: 'Returns result of given page number, when Pagination is enabled',
				default: 1,
				hint: 'Requires "Per Page" to be set to enable Pagination',
				type: 'number',
				routing: {
					send: {
						type: 'query',
						property: 'page',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Listen'],
			},
		},
	},
];

export default Fields;
