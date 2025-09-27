import { INodeProperties } from 'n8n-workflow';

export const Anreden: INodeProperties[] = [
	{
		displayName: 'Per Page',
		name: 'per_page',
		description: 'Enables Pagination and returns results paginated by given per_page.',
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
		displayOptions: {
			show: {
				resource: ['Listen'],
				operation: ['Anreden'],
			},
		},
	},
];

export const Gesellschaften: INodeProperties[] = [
	{
		displayName: 'Per Page',
		name: 'per_page',
		description: 'Enables Pagination and returns results paginated by given per_page.',
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
		displayOptions: {
			show: {
				resource: ['Listen'],
				operation: ['Gesellschaften'],
			},
		},
	},
];

export const KundenDetailFelder: INodeProperties[] = [
	{
		displayName: 'Per Page',
		name: 'per_page',
		description: 'Enables Pagination and returns results paginated by given per_page.',
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
		displayOptions: {
			show: {
				resource: ['Listen'],
				operation: ['Kunden Detail Felder'],
			},
		},
	},
];

export const Länder: INodeProperties[] = [
	{
		displayName: 'Per Page',
		name: 'per_page',
		description: 'Enables Pagination and returns results paginated by given per_page.',
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
		displayOptions: {
			show: {
				resource: ['Listen'],
				operation: ['Länder'],
			},
		},
	},
];

export const Rechtsformen: INodeProperties[] = [
	{
		displayName: 'Per Page',
		name: 'per_page',
		description: 'Enables Pagination and returns results paginated by given per_page.',
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
		displayOptions: {
			show: {
				resource: ['Listen'],
				operation: ['Rechtsformen'],
			},
		},
	},
];

export const Sparten: INodeProperties[] = [
	{
		displayName: 'Per Page',
		name: 'per_page',
		description: 'Enables Pagination and returns results paginated by given per_page.',
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
		displayOptions: {
			show: {
				resource: ['Listen'],
				operation: ['Sparten'],
			},
		},
	},
];

export const Status: INodeProperties[] = [
	{
		displayName: 'Per Page',
		name: 'per_page',
		description: 'Enables Pagination and returns results paginated by given per_page.',
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
		displayOptions: {
			show: {
				resource: ['Listen'],
				operation: ['Status'],
			},
		},
	},
];

export const Vermittler: INodeProperties[] = [
	{
		displayName: 'Per Page',
		name: 'per_page',
		description: 'Enables Pagination and returns results paginated by given per_page.',
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
		displayOptions: {
			show: {
				resource: ['Listen'],
				operation: ['Vermittler'],
			},
		},
	},
];

export const Zahlweisen: INodeProperties[] = [
	{
		displayName: 'Per Page',
		name: 'per_page',
		description: 'Enables Pagination and returns results paginated by given per_page.',
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
		displayOptions: {
			show: {
				resource: ['Listen'],
				operation: ['Zahlweisen'],
			},
		},
	},
];

export default [
	...Anreden,
	...Gesellschaften,
	...KundenDetailFelder,
	...Länder,
	...Rechtsformen,
	...Sparten,
	...Status,
	...Vermittler,
	...Zahlweisen,
];
