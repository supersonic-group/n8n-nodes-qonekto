import { INodeProperties } from 'n8n-workflow';

export const Shared: Record<string, INodeProperties> = {
	'Kunde Ameise ID': {
		displayName: 'Ameise Kundennummer',
		name: 'kunde_ameise_id',
		type: 'resourceLocator',
		default: '',
		required: true,
		description: 'The ID of the Kunde in Ameise',
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
		displayName: 'Anrede ID',
		name: 'anrede_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select an Anrede',
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
		displayName: 'Land ID',
		name: 'land_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a Land',
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
		displayName: 'Rechtsform ID',
		name: 'rechtsform_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a Rechtsform (required if Anrede is a juristic person)',
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
				...Shared['Vermittler ID'],
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
	},
	'Kunde Notification Settings': {
		displayName: 'Notification Settings',
		name: 'notification settings',
		type: 'collection',
		placeholder: 'Set Notification',
		default: {},
		options: [
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
				displayName: 'Datum',
				name: 'datum',
				type: 'dateTime',
				default: '',
				description: 'If empty, will use the current date and time',
			},
			{
				displayName: 'Vertrag ID',
				name: 'vertrags_id',
				description: 'Ameise ID of the related Vertrag',
				type: 'string',
				default: '',
			},
			{
				...Shared['Sparte ID'],
			},
			{
				displayName: 'Kundensichtbar',
				name: 'kundensichtbar',
				description: 'Whether to allow the customer to view the created file',
				type: 'boolean',
				default: true,
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				default: '["Tag"]',
			},
		],
	},
};
