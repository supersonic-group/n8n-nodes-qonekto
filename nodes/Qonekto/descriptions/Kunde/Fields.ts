import { INodeProperties } from 'n8n-workflow';
import { Shared, SharedCollections } from './Shared';

export const ListKunden: INodeProperties[] = [
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
					'Searches for all Kunden beginning with keyword in `vorname`, `nachname` or a match in any `kommunikation` fields. Cannot use filter parameter when passing search parameter.',
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
				resource: ['Kunde'],
				operation: ['List Kunden'],
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
				resource: ['Kunde'],
				operation: ['List Kunden'],
			},
		},
	},
];

export const CreateKunde: INodeProperties[] = [
	{
		...Shared['Anrede ID'],
		required: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		displayName: 'Vorname',
		name: 'vorname',
		type: 'string',
		default: '',
		required: true,
		description:
			'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld den Ansprechpartner. value darf maximal 255 Zeichen haben.',
		routing: {
			send: {
				property: 'vorname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		displayName: 'Nachname',
		name: 'nachname',
		type: 'string',
		default: '',
		required: true,
		description:
			'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld den Firmennamen. value darf maximal 255 Zeichen haben.',
		routing: {
			send: {
				property: 'nachname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		...Shared['Land ID'],
		required: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		...SharedCollections['Kunde Optional Fields'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		...SharedCollections['Kunde Notification Settings'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
];

export const FilterKunden: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		options: [
			{
				...Shared['Vermittler ID'],
			},
			{
				...Shared['Anrede ID'],
			},
			{
				displayName: 'Vorname',
				name: 'vorname',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'vorname',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Nachname',
				name: 'nachname',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'nachname',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Titel',
				name: 'titel',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'titel',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Strasse',
				name: 'strasse',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'strasse',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Plz',
				name: 'plz',
				type: 'string',
				default: '',
				description: 'Value muss zwischen 4 und 5 Stellen haben',
				routing: {
					send: {
						property: 'plz',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Ort',
				name: 'ort',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'ort',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				...Shared['Land ID'],
			},
			{
				displayName: 'Geburtsdatum',
				name: 'geburtsdatum',
				type: 'dateTime',
				default: '',
				description: 'Must be a valid date in the format <code>Y-m-d,d.m.Y</code>',
				routing: {
					send: {
						property: 'geburtsdatum',
						propertyInDotNotation: false,
						type: 'body',
						value:
							'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
					},
				},
			},
			{
				displayName: 'Beruf',
				name: 'beruf',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'beruf',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Per Du',
				name: 'per_du',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						property: 'per_du',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Nationalitaet',
				name: 'nationalitaet',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'nationalitaet',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				...Shared['Rechtsform ID'],
			},
			{
				displayName: 'Benutzername Simplr',
				name: 'benutzername_simplr',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'benutzername_simplr',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Verstorben',
				name: 'verstorben',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						property: 'verstorben',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Kommunikation',
				name: 'kommunikation',
				type: 'json',
				default: 'null',
				routing: {
					send: {
						property: 'kommunikation',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'Details',
				name: 'details',
				type: 'json',
				default: 'null',
				routing: {
					send: {
						property: 'details',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Filter Kunden'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Filter Kunden'],
			},
		},
	},
];

const KundeFields: INodeProperties[] = [
	{
		...Shared['Vermittler ID'],
	},
	{
		...Shared['Anrede ID'],
	},
	{
		displayName: 'Vorname',
		name: 'vorname',
		type: 'string',
		default: '',
		description:
			'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld den Ansprechpartner. value darf maximal 255 Zeichen haben.',
		routing: {
			send: {
				property: 'vorname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Nachname',
		name: 'nachname',
		type: 'string',
		default: '',
		description:
			'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld den Firmennamen. value darf maximal 255 Zeichen haben.',
		routing: {
			send: {
				property: 'nachname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Titel',
		name: 'titel',
		type: 'string',
		default: '',
		description:
			'Wird nicht verwendet, wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist. value darf maximal 255 Zeichen haben.',
		routing: {
			send: {
				property: 'titel',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Strasse',
		name: 'strasse',
		type: 'string',
		default: '',
		description: 'Value darf maximal 255 Zeichen haben',
		routing: {
			send: {
				property: 'strasse',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Plz',
		name: 'plz',
		type: 'string',
		default: '',
		description: 'Value muss zwischen 4 und 5 Stellen haben',
		routing: {
			send: {
				property: 'plz',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Ort',
		name: 'ort',
		type: 'string',
		default: '',
		description: 'Value darf maximal 255 Zeichen haben',
		routing: {
			send: {
				property: 'ort',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		...Shared['Land ID'],
	},
	{
		displayName: 'Geburtsdatum',
		name: 'geburtsdatum',
		type: 'string',
		default: '',
		description:
			'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld das Gründungsdatum. Must be a valid date in the format <code>Y-m-d,d.m.Y</code>.',
		routing: {
			send: {
				property: 'geburtsdatum',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Beruf',
		name: 'beruf',
		type: 'string',
		default: '',
		description:
			'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld die Branche. value darf maximal 255 Zeichen haben.',
		routing: {
			send: {
				property: 'beruf',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Per Du',
		name: 'per_du',
		type: 'boolean',
		default: false,
		description: 'Whether to pass this to Ameise; currently not passed',
		routing: {
			send: {
				property: 'per_du',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Nationalitaet',
		name: 'nationalitaet',
		type: 'string',
		default: '',
		description:
			'Wird aktuell nicht an die Ameise übergeben. value darf maximal 255 Zeichen haben.',
		routing: {
			send: {
				property: 'nationalitaet',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		...Shared['Rechtsform ID'],
	},
	{
		displayName: 'Benutzername Simplr',
		name: 'benutzername_simplr',
		type: 'string',
		default: '',
		description: 'Value darf maximal 255 Zeichen haben',
		routing: {
			send: {
				property: 'benutzername_simplr',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Verstorben',
		name: 'verstorben',
		type: 'boolean',
		default: false,
		description: 'Whether to mark the customer as deceased; currently not passed to Ameise',
		routing: {
			send: {
				property: 'verstorben',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Kommunikation',
		name: 'kommunikation',
		type: 'json',
		default: '{\n  "email": "info@muster.test",\n  "website": "https://url.test"\n}',
		description: 'Alle Standard-Kommunikationsdaten für diesen Kunden',
		routing: {
			send: {
				property: 'kommunikation',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
	{
		displayName: 'Details',
		name: 'details',
		type: 'json',
		default:
			'{\n  "feld_1_float": 12.2,\n  "feld_2_int": 3,\n  "feld_3_text": "test",\n  "feld_4_bool": false,\n  "feld_5_date": "2024-01-23"\n}',
		description: 'Kunden-Details als Objekt mit Feld-ID Schlüssel und dem entsprechenden Wert',
		routing: {
			send: {
				property: 'details',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
];

export const UpsertKunde: INodeProperties[] = [
	{
		displayName: 'Fields to Set on Customer (Existing or New)',
		name: 'kunde fields',
		type: 'collection',
		placeholder: 'Add Field',
		required: true,
		default: {},
		options: KundeFields.slice(0),
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
	{
		...SharedCollections['Kunde Notification Settings'],
		description: 'Notification Settings (Only for Newly Created Customer)',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
	{
		displayName: 'Fields to Use to Search for Existing Customer',
		name: '_search',
		type: 'multiOptions',
		default: ['vorname', 'nachname', 'kommunikation.email_any'],
		required: true,
		description:
			'Parameter names which should be used to search for existing customer. Allows kommunikation.email_**any** to match any kontext (private, business). Furthermore customer may have the kommunikation.* property not as the default kommunikation value.',
		options: [
			...KundeFields.filter((item) => item.type !== 'json').map((item) => {
				return {
					name: item.displayName,
					value: item.name,
				};
			}),
			...['email', 'telefon', 'mobil', 'website', 'fax'].flatMap((art) =>
				['any', 'private', 'business'].map((kontext) => ({
					name:
						'Kommunikation: ' +
						{
							any: 'Any',
							private: 'Private',
							business: 'Business',
						}[kontext] +
						' ' +
						{
							email: 'E-Mail',
							telefon: 'Telefon',
							mobil: 'Mobil',
							website: 'Website',
							fax: 'Fax',
						}[art],
					value: `kommunikation.${art}_${kontext}`,
				})),
			),
		],
		routing: {
			send: {
				property: '_search',
				propertyInDotNotation: false,
				type: 'body',
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
	{
		displayName: 'Kunde Fields to Set only for Newly Created Customer',
		name: '_default',
		type: 'collection',
		description:
			'Parameters that will only be set for a newly created customer and not already set. If a customer is found, the values of the fields in this collection will not be used.',
		default: {},
		options: KundeFields.slice(0).map((item) => {
			item.routing = item.routing || {};
			item.routing.send = item.routing.send || {};
			item.routing.send.property = '_default.' + item.routing.send.property;
			item.routing.send.propertyInDotNotation = true;
			return item;
		}),
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
];

export const ShowKunde: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Show Kunde'],
			},
		},
	},
	{
		displayName: 'With Kommunikationen',
		name: 'with-kommunikationen',
		description: 'Whether to load and return kommunikationen and default fields for the kunde',
		default: true,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'with-kommunikationen',
				value: '={{ $value }}',
				propertyInDotNotation: false,
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Show Kunde'],
			},
		},
	},
	{
		displayName: 'With Details',
		name: 'with-details',
		description: 'Whether to load and return details for the kunde',
		default: true,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'with-details',
				value: '={{ $value }}',
				propertyInDotNotation: false,
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Show Kunde'],
			},
		},
	},
];

export const UpdateKunde: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Update Kunde'],
			},
		},
	},
	{
		displayName: 'Optional Fields',
		name: 'optional fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				...Shared['Vermittler ID'],
			},
			{
				...Shared['Anrede ID'],
			},
			{
				displayName: 'Vorname',
				name: 'vorname',
				type: 'string',
				default: '',
				description:
					'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld den Ansprechpartner. value darf maximal 255 Zeichen haben.',
				routing: {
					send: {
						property: 'vorname',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Nachname',
				name: 'nachname',
				type: 'string',
				default: '',
				description:
					'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld den Firmennamen. value darf maximal 255 Zeichen haben.',
				routing: {
					send: {
						property: 'nachname',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Titel',
				name: 'titel',
				type: 'string',
				default: '',
				description:
					'Wird nicht verwendet, wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist. value darf maximal 255 Zeichen haben.',
				routing: {
					send: {
						property: 'titel',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Strasse',
				name: 'strasse',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'strasse',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Plz',
				name: 'plz',
				type: 'string',
				default: '',
				description: 'Value muss zwischen 4 und 5 Stellen haben',
				routing: {
					send: {
						property: 'plz',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Ort',
				name: 'ort',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'ort',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				...Shared['Land ID'],
			},
			{
				displayName: 'Geburtsdatum',
				name: 'geburtsdatum',
				type: 'dateTime',
				default: '',
				description:
					'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld das Gründungsdatum. Must be a valid date in the format <code>Y-m-d,d.m.Y</code>.',
				routing: {
					send: {
						property: 'geburtsdatum',
						propertyInDotNotation: false,
						type: 'body',
						value:
							'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
					},
				},
			},
			{
				displayName: 'Beruf',
				name: 'beruf',
				type: 'string',
				default: '',
				description:
					'Wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist bezeichnet dieses Feld die Branche. value darf maximal 255 Zeichen haben.',
				routing: {
					send: {
						property: 'beruf',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Per Du',
				name: 'per_du',
				type: 'boolean',
				default: false,
				description: 'Whether to pass this to Ameise; currently not passed',
				routing: {
					send: {
						property: 'per_du',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Nationalitaet',
				name: 'nationalitaet',
				type: 'string',
				default: '',
				description:
					'Wird aktuell nicht an die Ameise übergeben. value darf maximal 255 Zeichen haben.',
				routing: {
					send: {
						property: 'nationalitaet',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				...Shared['Rechtsform ID'],
			},
			{
				displayName: 'Benutzername Simplr',
				name: 'benutzername_simplr',
				type: 'string',
				default: '',
				description: 'Value darf maximal 255 Zeichen haben',
				routing: {
					send: {
						property: 'benutzername_simplr',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Verstorben',
				name: 'verstorben',
				type: 'boolean',
				default: false,
				description: 'Whether to mark the customer as deceased; currently not passed to Ameise',
				routing: {
					send: {
						property: 'verstorben',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Kommunikation',
				name: 'kommunikation',
				type: 'json',
				default: '{\n  "email": "info@muster.test",\n  "website": "https://url.test"\n}',
				description: 'Alle Standard-Kommunikationsdaten für diesen Kunden',
				routing: {
					send: {
						property: 'kommunikation',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'Details',
				name: 'details',
				type: 'json',
				default:
					'{\n  "feld_1_float": 12.2,\n  "feld_2_int": 3,\n  "feld_3_text": "test",\n  "feld_4_bool": false,\n  "feld_5_date": "2024-01-23"\n}',
				description: 'Kunden-Details als Objekt mit Feld-ID Schlüssel und dem entsprechenden Wert',
				routing: {
					send: {
						property: 'details',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Update Kunde'],
			},
		},
	},
];

export const UploadFile: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		displayName: 'File',
		name: 'file',
		type: 'string',
		default: '',
		required: true,
		description: 'Name of the binary property to upload as file',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		displayName: 'Betreff',
		name: 'betreff',
		type: 'string',
		default: '',
		description: 'If empty, will use the original filename from the binary property',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		...SharedCollections['File Optional Fields'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
];

export const CreateFile: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
	},
	{
		displayName: 'Typ',
		name: 'typ',
		type: 'options',
		default: 'sonstiges',
		options: [
			{ name: 'Fax', value: 'fax' },
			{ name: 'E-Mail', value: 'email' },
			{ name: 'SMS', value: 'sms' },
			{ name: 'Telefon', value: 'telefon' },
			{ name: 'Brief', value: 'brief' },
			{ name: 'Persönlich', value: 'persoenlich' },
			{ name: 'Chat', value: 'chat' },
			{ name: 'Sonstiges', value: 'sonstiges' },
		],
		required: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'typ',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Betreff',
		name: 'betreff',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'betreff',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		description: 'Text content of the entry',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'content',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		...SharedCollections['File Optional Fields'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
	},
];

export default [
	...ListKunden,
	...CreateKunde,
	...FilterKunden,
	...UpsertKunde,
	...ShowKunde,
	...UpdateKunde,
	...UploadFile,
	...CreateFile,
];
