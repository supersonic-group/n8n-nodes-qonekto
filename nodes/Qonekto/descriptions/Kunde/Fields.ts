import { INodeProperties } from 'n8n-workflow';
import { Shared } from './Shared';

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
		displayName: 'Mitteilung Benutzername',
		name: 'mitteilung-benutzername',
		description: 'Whether to send the customer the account username via email (if given)',
		default: false,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'mitteilung-benutzername',
				value: '={{ $value }}',
				propertyInDotNotation: false,
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
		displayName: 'Mitteilung Passwort Link',
		name: 'mitteilung-passwort-link',
		description:
			'Whether to send the customer a link to reset their account password via email (if given)',
		default: false,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'mitteilung-passwort-link',
				value: '={{ $value }}',
				propertyInDotNotation: false,
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
		displayName: 'Mitteilung Erstinfo Unterbinden',
		name: 'mitteilung-erstinfo-unterbinden',
		description:
			'Whether to suppress sending the customer the Erstinformationen nach §11 der Vermittlerverordnung via email (if given)',
		default: true,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'mitteilung-erstinfo-unterbinden',
				value: '={{ $value }}',
				propertyInDotNotation: false,
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
		...Shared['Vermittler ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		...Shared['Rechtsform ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
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

export const UpsertKunde: INodeProperties[] = [
	{
		displayName: 'Mitteilung Benutzername',
		name: 'mitteilung-benutzername',
		description:
			'Whether to send the customer the account username via email (if given). Only applies if the customer could not be found.',
		default: true,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'mitteilung-benutzername',
				value: '={{ $value }}',
				propertyInDotNotation: false,
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
		displayName: 'Mitteilung Passwort Link',
		name: 'mitteilung-passwort-link',
		description:
			'Whether to send the customer a link to reset their account password via email (if given). Only applies if the customer could not be found.',
		default: true,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'mitteilung-passwort-link',
				value: '={{ $value }}',
				propertyInDotNotation: false,
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
		displayName: 'Mitteilung Erstinfo Unterbinden',
		name: 'mitteilung-erstinfo-unterbinden',
		description:
			'Whether to suppress sending the customer the Erstinformationen nach §11 der Vermittlerverordnung via email (if given). Only applies if the customer could not be found.',
		default: true,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'mitteilung-erstinfo-unterbinden',
				value: '={{ $value }}',
				propertyInDotNotation: false,
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
		...Shared['Vermittler ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
	{
		...Shared['Anrede ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
	{
		...Shared['Land ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
	{
		...Shared['Rechtsform ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
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
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
	{
		displayName: 'Search',
		name: '_search',
		type: 'json',
		default: '[\n  "vorname",\n  "nachname",\n  "kommunikation.email_private"\n]',
		required: true,
		description:
			'Parameter names which should be used to search for existing customer. Allows kommunikation.email_**any** to match any kontext (private, business). Furthermore customer may have the kommunikation.* property not as the default kommunikation value.',
		routing: {
			send: {
				property: '_search',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
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
		displayName: 'Default',
		name: '_default',
		type: 'json',
		default: '{\n  "anrede_id": "1",\n  "land_id": "DE"\n}',
		description:
			'Default parameters that should be set only for newly created customer (if not passed via other parameters)',
		routing: {
			send: {
				property: '_default',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
			},
		},
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
		displayName: 'Datum',
		name: 'datum',
		type: 'dateTime',
		default: '',
		description: 'If empty, will use the current date and time',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		displayName: 'Vertrag ID',
		name: 'vertrags_id',
		description: 'Ameise ID of the related Vertrag',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		...Shared['Sparte ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		displayName: 'Kundensichtbar',
		name: 'kundensichtbar',
		description: 'Whether to allow the customer to view the created file',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		default: '["Tag"]',
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
		displayName: 'Datum',
		name: 'datum',
		type: 'dateTime',
		default: '',
		description: 'If empty, will use the current date and time',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'datum',
				propertyInDotNotation: false,
				type: 'body',
				value:
					'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd\'T\'HH:mm:ssZZ") : null }}',
			},
		},
	},
	{
		displayName: 'Vertrag ID',
		name: 'vertrags_id',
		description: 'Ameise ID of the related Vertrag',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'zuordnung.vertrags_id',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		...Shared['Sparte ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'zuordnung.sparte_id',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Kundensichtbar',
		name: 'kundensichtbar',
		description: 'Whether to allow the customer to view the created file',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'meta.kundensichtbar',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		default: '["Tag"]',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'tags',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
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
