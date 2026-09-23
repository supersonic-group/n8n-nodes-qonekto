import { INodeProperties } from 'n8n-workflow';
import { ATOM_TIMESTAMP_VALUE, DATE_ONLY_VALUE } from '../Routing';

export const Shared: Record<string, INodeProperties> = {
	'Vertrag Ameise ID': {
		displayName: 'Ameise Contract Number',
		name: 'vertrag_ameise_id',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the contract in Ameise',
	},
	'Kunde Ameise ID': {
		displayName: 'Ameise Customer Number',
		name: 'kunde_ameise_id',
		type: 'resourceLocator',
		default: '',
		required: true,
		description: 'The ID of the customer in Ameise',
		modes: [
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '^[0-9]+$',
							errorMessage: 'Must be a number',
						},
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
	},
	'Anrede ID': {
		displayName: 'Salutation ID',
		name: 'anrede_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a salutation',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getAnreden',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
		],
		routing: {
			send: {
				property: 'anrede_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Vermittler ID': {
		displayName: 'Broker ID',
		name: 'vermittler_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a broker',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getVermittler',
					searchable: true,
				},
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
	'Land ID': {
		displayName: 'Country ID',
		name: 'land_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a country',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getLaender',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
		],
		routing: {
			send: {
				property: 'land_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Rechtsform ID': {
		displayName: 'Legal Form ID',
		name: 'rechtsform_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a legal form (required if the salutation is a legal entity)',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getRechtsformen',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
		],
		routing: {
			send: {
				property: 'rechtsform_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Sparte ID': {
		displayName: 'Division ID',
		name: 'sparte_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a division',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getSparten',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
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
};

export const SharedCollections: Record<string, INodeProperties> = {
	'Kunde Optional Fields': {
		displayName: 'Optional Fields',
		name: 'optional fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Address Informally (Du)',
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
				...Shared['Vermittler ID'],
			},
			{
				displayName: 'City',
				name: 'ort',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
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
				displayName: 'Communication',
				name: 'kommunikation',
				type: 'json',
				default: '{\n  "email": "info@muster.test",\n  "website": "https://url.test"\n}',
				description: 'All default communication data for this customer',
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
				displayName: 'Date of Birth',
				name: 'geburtsdatum',
				type: 'dateTime',
				default: '',
				description:
					'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the founding date. Must be a valid date in the format <code>Y-m-d,d.m.Y</code>.',
				routing: {
					send: {
						property: 'geburtsdatum',
						propertyInDotNotation: false,
						type: 'body',
						value: DATE_ONLY_VALUE,
					},
				},
			},
			{
				displayName: 'Deceased',
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
				displayName: 'Details',
				name: 'details',
				type: 'json',
				default:
					'{\n  "feld_1_float": 12.2,\n  "feld_2_int": 3,\n  "feld_3_text": "test",\n  "feld_4_bool": false,\n  "feld_5_date": "2024-01-23"\n}',
				description: 'Customer details as an object keyed by field ID, with the corresponding value',
				routing: {
					send: {
						property: 'details',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				...Shared['Rechtsform ID'],
			},
			{
				displayName: 'Nationality',
				name: 'nationalitaet',
				type: 'string',
				default: '',
				description:
					'Currently not passed to Ameise. At most 255 characters.',
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
				displayName: 'Occupation',
				name: 'beruf',
				type: 'string',
				default: '',
				description:
					'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the industry. At most 255 characters.',
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
				displayName: 'Postal Code',
				name: 'plz',
				type: 'string',
				default: '',
				description: 'For German addresses 4 or 5 digits. Other countries allow up to 10 characters of letters, digits, spaces and hyphens.',
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
				displayName: 'Simplr Username',
				name: 'benutzername_simplr',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
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
				displayName: 'Street',
				name: 'strasse',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
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
				displayName: 'Title',
				name: 'titel',
				type: 'string',
				default: '',
				description:
					'Not used if the salutation (anrede_id) is a legal entity (juristische_person = true). At most 255 characters.',
				routing: {
					send: {
						property: 'titel',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
		],
	},
	'Kunde Notification Settings': {
		displayName: 'Notification Settings',
		name: 'notification settings',
		type: 'collection',
		placeholder: 'Set Notification',
		default: {},
		options: [
			{
				displayName: 'Notify Username',
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
			},
			{
				displayName: 'Notify Password Link',
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
			},
			{
				displayName: 'Suppress Initial Information',
				name: 'mitteilung-erstinfo-unterbinden',
				description:
					'Whether to suppress sending the customer the initial information required by §11 VersVermV (Erstinformation) via email (if given)',
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
			},
		],
	},
	'File Optional Fields': {
		displayName: 'Optional Fields',
		name: 'optional fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Date',
				name: 'datum',
				type: 'dateTime',
				default: '',
				description: 'If empty, will use the current date and time',
				routing: {
					send: {
						property: 'datum',
						propertyInDotNotation: false,
						type: 'body',
						value: ATOM_TIMESTAMP_VALUE,
					},
				},
			},
			{
				displayName: 'Contract ID',
				name: 'vertrags_id',
				description: 'Ameise ID of the related contract',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'zuordnung.vertrags_id',
						value: '={{ $value }}',
						propertyInDotNotation: true,
					},
				},
			},
			{
				...Shared['Sparte ID'],
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
				displayName: 'Visible to Customer',
				name: 'kundensichtbar',
				description: 'Whether to allow the customer to view the created file',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'meta.kundensichtbar',
						value: '={{ $value }}',
						propertyInDotNotation: true,
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				default: '["Tag"]',
				routing: {
					send: {
						property: 'tags',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
		],
	},
};
