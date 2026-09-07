import { INodeProperties } from 'n8n-workflow';

export const ClaimShared: Record<string, INodeProperties> = {
	'Claim ID': {
		displayName: 'Claim ID',
		name: 'claimId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the claim',
	},
	Status: {
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 'offen',
		options: [
			{
				name: 'Offen',
				value: 'offen',
			},
			{
				name: 'Geschlossen',
				value: 'geschlossen',
			},
		],
		routing: {
			send: {
				property: 'status',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Custom Number': {
		displayName: 'Custom Number',
		name: 'customNumber',
		type: 'string',
		default: '',
		description: 'Value darf maximal 36 Zeichen haben',
		routing: {
			send: {
				property: 'customNumber',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	Comment: {
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		default: '',
		description: 'Value darf maximal 1000 Zeichen haben',
		routing: {
			send: {
				property: 'comment',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Claim Date': {
		displayName: 'Claim Date',
		name: 'claimDate',
		type: 'dateTime',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'claimDate',
				propertyInDotNotation: false,
				type: 'body',
				value:
					'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
			},
		},
	},
	'Notification Date': {
		displayName: 'Notification Date',
		name: 'notificationDate',
		type: 'dateTime',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'notificationDate',
				propertyInDotNotation: false,
				type: 'body',
				value:
					'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
			},
		},
	},
	'List Filter Fields': {
		displayName: 'Filter Fields',
		name: 'filter fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Filters by claim number, comment, policy number or risk',
				routing: {
					send: {
						type: 'query',
						property: 'search',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Filters by claim status, e.g. offen or geschlossen',
				routing: {
					send: {
						type: 'query',
						property: 'status',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				description: 'Filters by claim type',
				routing: {
					send: {
						type: 'query',
						property: 'type',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
		],
	},
	'List Pagination Fields': {
		displayName: 'Pagination Fields',
		name: 'pagination fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Per Page',
				name: 'perPage',
				type: 'number',
				default: 50,
				// The Claims API is a passthrough and takes camelCase perPage, unlike the
				// per_page used by the connector's own list endpoints.
				description: 'Number of results per page',
				routing: {
					send: {
						type: 'query',
						property: 'perPage',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Returns result of given page number',
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
	},
};
