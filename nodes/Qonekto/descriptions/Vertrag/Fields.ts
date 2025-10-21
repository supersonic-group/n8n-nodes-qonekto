import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';

export const ListVertraege: INodeProperties[] = [
	{
		displayName: 'Optional Kunde Filter',
		name: 'optional kunde filter',
		type: 'collection',
		placeholder: 'Filter by Ameise Kundennummer',
		default: {},
		options: [
			{
				...Shared['Kunde Ameise ID'],
				required: false,
				name: 'kunde_id',
				routing: {
					send: {
						type: 'query',
						property: 'kunde_id',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Vertrag'],
				operation: ['List Vertraege'],
			},
		},
	},
	{
		displayName: 'Optional Search',
		name: 'optional search',
		type: 'collection',
		placeholder: 'Add Search Field',
		default: {},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				description:
					'Searches for all Vertraege beginning with keyword in `versicherungsscheinnummer`, or `risiko`',
				default: '',
				type: 'string',
				routing: {
					send: {
						type: 'query',
						property: 'search',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Vertrag'],
				operation: ['List Vertraege'],
			},
		},
	},
	{
		displayName: 'Pagination Fields',
		name: 'pagination fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Per Page',
				name: 'per_page',
				description: 'Changes per_page used for pagination from default 25 to max 100',
				default: 50,
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
				resource: ['Vertrag'],
				operation: ['List Vertraege'],
			},
		},
	},
];

export const CreateVertrag: INodeProperties[] = [
	{
		displayName: 'Kunde ID',
		name: 'kunde_id',
		type: 'resourceLocator',
		default: '',
		required: true,
		description: 'Select a Kunde by Ameise ID',
		modes: [
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				validation: [
					{ type: 'regex', properties: { regex: '^[0-9]+$', errorMessage: 'Must be a number' } },
				],
			},
			{
				displayName: 'Search',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'searchKunden',
					searchable: true,
					searchFilterRequired: true,
				},
			},
		],
		routing: {
			send: {
				property: 'kunde_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: { show: { resource: ['Vertrag'], operation: ['Create Vertrag'] } },
	},
	{
		displayName: 'Beginn',
		name: 'beginn',
		type: 'dateTime',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'beginn',
				propertyInDotNotation: false,
				type: 'body',
				value:
					'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
			},
		},
		displayOptions: { show: { resource: ['Vertrag'], operation: ['Create Vertrag'] } },
	},
	{
		displayName: 'Beitrag Netto',
		name: 'beitrag_netto',
		type: 'number',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'beitrag_netto',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: { show: { resource: ['Vertrag'], operation: ['Create Vertrag'] } },
	},
	{
		displayName: 'Versicherungsscheinnummer',
		name: 'versicherungsscheinnummer',
		type: 'string',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'versicherungsscheinnummer',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: { show: { resource: ['Vertrag'], operation: ['Create Vertrag'] } },
	},
	{
		displayName: 'Risiko',
		name: 'risiko',
		type: 'string',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'risiko',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: { show: { resource: ['Vertrag'], operation: ['Create Vertrag'] } },
	},
	{
		displayName: 'Optional Fields',
		name: 'optional fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Vermittler ID',
				name: 'vermittler_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Vermittler',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getVermittler', searchable: true },
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						validation: [
							{
								type: 'regex',
								properties: {
									regex: '^[0-9A-Za-z]{6}$',
									errorMessage: 'The ID must be alpanumeric and 6 characters long',
								},
							},
						],
					},
				],
				routing: {
					send: {
						property: 'vermittler_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Sparte ID',
				name: 'sparte_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Sparte',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getSparten', searchable: true },
					},
					{ displayName: 'ID', name: 'id', type: 'string' },
				],
				routing: {
					send: {
						property: 'sparte_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Gesellschaft ID',
				name: 'gesellschaft_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Gesellschaft',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getGesellschaften', searchable: true },
					},
					{ displayName: 'ID', name: 'id', type: 'string' },
				],
				routing: {
					send: {
						property: 'gesellschaft_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Status ID',
				name: 'status_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Status',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getStatus', searchable: true },
					},
					{ displayName: 'ID', name: 'id', type: 'string' },
				],
				routing: {
					send: {
						property: 'status_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Zahlweise ID',
				name: 'zahlweise_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Zahlweise',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getZahlweisen', searchable: true },
					},
					{ displayName: 'ID', name: 'id', type: 'string' },
				],
				routing: {
					send: {
						property: 'zahlweise_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Ablauf',
				name: 'ablauf',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						property: 'ablauf',
						propertyInDotNotation: false,
						type: 'body',
						value:
							'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
					},
				},
			},
		],
		displayOptions: { show: { resource: ['Vertrag'], operation: ['Create Vertrag'] } },
	},
];

export const FilterVertraege: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		options: [
			{
				displayName: 'Vermittler ID',
				name: 'vermittler_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Vermittler',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getVermittler', searchable: true },
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						validation: [
							{
								type: 'regex',
								properties: {
									regex: '^[0-9A-Za-z]{6}$',
									errorMessage: 'The ID must be alpanumeric and 6 characters long',
								},
							},
						],
					},
				],
				routing: {
					send: {
						property: 'vermittler_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Kunde ID',
				name: 'kunde_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Kunde by Ameise ID',
				modes: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						validation: [
							{
								type: 'regex',
								properties: { regex: '^[0-9]+$', errorMessage: 'Must be a number' },
							},
						],
					},
					{
						displayName: 'Search',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'searchKunden',
							searchable: true,
							searchFilterRequired: true,
						},
					},
				],
				routing: {
					send: {
						property: 'kunde_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Sparte ID',
				name: 'sparte_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Sparte',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getSparten', searchable: true },
					},
					{ displayName: 'ID', name: 'id', type: 'string' },
				],
				routing: {
					send: {
						property: 'sparte_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Gesellschaft ID',
				name: 'gesellschaft_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Gesellschaft',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getGesellschaften', searchable: true },
					},
					{ displayName: 'ID', name: 'id', type: 'string' },
				],
				routing: {
					send: {
						property: 'gesellschaft_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Status ID',
				name: 'status_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Status',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getStatus', searchable: true },
					},
					{ displayName: 'ID', name: 'id', type: 'string' },
				],
				routing: {
					send: {
						property: 'status_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Zahlweise ID',
				name: 'zahlweise_id',
				type: 'resourceLocator',
				default: '',
				description: 'Select a Zahlweise',
				modes: [
					{
						displayName: 'List',
						name: 'list',
						type: 'list',
						typeOptions: { searchListMethod: 'getZahlweisen', searchable: true },
					},
					{ displayName: 'ID', name: 'id', type: 'string' },
				],
				routing: {
					send: {
						property: 'zahlweise_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Versicherungsscheinnummer',
				name: 'versicherungsscheinnummer',
				type: 'string',
				default: '',
				routing: {
					send: {
						property: 'versicherungsscheinnummer',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Risiko',
				name: 'risiko',
				type: 'string',
				default: '',
				routing: {
					send: {
						property: 'risiko',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Beitrag Netto',
				name: 'beitrag_netto',
				type: 'number',
				default: '',
				routing: {
					send: {
						property: 'beitrag_netto',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Beginn',
				name: 'beginn',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						property: 'beginn',
						propertyInDotNotation: false,
						type: 'body',
						value:
							'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
					},
				},
			},
			{
				displayName: 'Ablauf',
				name: 'ablauf',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						property: 'ablauf',
						propertyInDotNotation: false,
						type: 'body',
						value:
							'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
					},
				},
			},
		],
		displayOptions: { show: { resource: ['Vertrag'], operation: ['Filter Vertraege'] } },
	},
	{
		displayName: 'Pagination Fields',
		name: 'pagination fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Skip',
				name: '_skip',
				type: 'number',
				default: 0,
				description: 'How many items to skip in results',
				routing: {
					send: {
						property: '_skip',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Limit',
				name: '_limit',
				type: 'number',
				default: 25,
				description: 'How many items to return in results',
				hint: 'Max: 100',
				routing: {
					send: {
						property: '_limit',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
			},
		],
		displayOptions: { show: { resource: ['Vertrag'], operation: ['Filter Vertraege'] } },
	},
];

export const ShowVertrag: INodeProperties[] = [
	{
		displayName: 'Ameise Vertragsnummer',
		name: 'vertrag_ameise_id',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the Vertrag in Ameise',
		displayOptions: { show: { resource: ['Vertrag'], operation: ['Show Vertrag'] } },
	},
];

export const Fields: INodeProperties[] = [
	...ListVertraege,
	...CreateVertrag,
	...FilterVertraege,
	...ShowVertrag,
];

export default Fields;
