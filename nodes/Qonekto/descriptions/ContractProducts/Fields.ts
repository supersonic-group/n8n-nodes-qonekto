import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';
import { DATE_ONLY_VALUE } from '../Routing';

export const GetSparteProductTemplate: INodeProperties[] = [
	{
		...Shared['Sparte ID'],
		displayName: 'Ameise Sparte ID',
		name: 'sparte_ameise_id',
		required: true,
		description: 'The ID of the Sparte in Ameise',
		routing: undefined,
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Get Sparte Product Template'],
			},
		},
	},
];

export const GetContractProducts: INodeProperties[] = [
	{
		...Shared['Vertrag Ameise ID'],
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Get Contract Products'],
			},
		},
	},
];

export const UpdateContractProducts: INodeProperties[] = [
	{
		...Shared['Vertrag Ameise ID'],
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Update Contract Products'],
			},
		},
	},
	{
		displayName: 'Anweisungen',
		name: 'anweisungen',
		type: 'json',
		default: '[{"Setze": "Produkt[Name]/Elementarprodukt[Name]", "Wert": null}]',
		required: true,
		description:
			'List of update instructions. Each entry is either {"Setze": path, "Wert": value} or {"Loesche": path}, never both. Component paths use Produkt[Name]/Elementarprodukt[Name] notation, with a "/" inside a name escaped as "\\/". Missing components are created automatically. "Setze" is only supported for VariableWert; send "Wert": null to clear one.',
		// No `send` routing: the operation sets the whole body from this value, because the
		// API expects a top-level array rather than an object with this as a property.
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Update Contract Products'],
			},
		},
	},
];

export const CreateKfzContractProducts: INodeProperties[] = [
	{
		...Shared['Vertrag Ameise ID'],
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
	{
		displayName: 'Halter Beziehungswert',
		name: 'halter_beziehungswert',
		type: 'options',
		default: 1,
		required: true,
		description: 'Relationship of the vehicle keeper to the policy holder',
		options: [
			{ name: '1', value: 1 },
			{ name: '2', value: 2 },
			{ name: '3', value: 3 },
			{ name: '4', value: 4 },
			{ name: '5', value: 5 },
			{ name: '6', value: 6 },
		],
		routing: {
			send: {
				property: 'Halter.Beziehungswert',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
	{
		displayName: 'Halter Vorname',
		name: 'halter_vorname',
		type: 'string',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'Halter.Vorname',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
	{
		displayName: 'Halter Nachname',
		name: 'halter_nachname',
		type: 'string',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'Halter.Nachname',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
	{
		displayName: 'Halter Strasse',
		name: 'halter_strasse',
		type: 'string',
		default: '',
		required: true,
		description: 'Street and house number of the vehicle keeper',
		routing: {
			send: {
				property: 'Halter.Strasse',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
	{
		displayName: 'Halter PLZ',
		name: 'halter_plz',
		type: 'string',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'Halter.PLZ',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
	{
		displayName: 'Halter Ort',
		name: 'halter_ort',
		type: 'string',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'Halter.Ort',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
	{
		displayName: 'Halter Geburtsdatum',
		name: 'halter_geburtsdatum',
		type: 'dateTime',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'Halter.Geburtsdatum',
				propertyInDotNotation: true,
				type: 'body',
				value: DATE_ONLY_VALUE,
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
	{
		displayName: 'Halter Geschlecht',
		name: 'halter_geschlecht',
		type: 'options',
		default: 1,
		required: true,
		options: [
			{ name: '1', value: 1 },
			{ name: '2', value: 2 },
		],
		routing: {
			send: {
				property: 'Halter.Geschlecht',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
	{
		displayName: 'Halter Personentyp',
		name: 'halter_personentyp',
		type: 'options',
		default: 1,
		required: true,
		options: [
			{ name: '1', value: 1 },
			{ name: '2', value: 2 },
		],
		routing: {
			send: {
				property: 'Halter.Personentyp',
				propertyInDotNotation: true,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
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
				displayName: 'Fahrer',
				name: 'Fahrer',
				type: 'json',
				default: '[]',
				// Sent verbatim. The entries carry upstream field names with spaces
				// ("Berufliche Stellung"), and Familienstand / Berufliche Stellung are
				// deliberately not enumerated server-side because Ameise owns those code
				// lists and changes them — so this stays free-form rather than freezing
				// a list here that would reject values that became legal upstream.
				description:
					'Drivers, as a JSON array. Per entry: Beziehungswert (1-5), Vorname, Nachname, Geschlecht (1-2), Familienstand (numeric code), "Berufliche Stellung" (numeric code), "Teilnahme am begleiteten Fahren" (boolean), "In haeuslicher Gemeinschaft mit VN" (0 or 1), "Fuehrerschein seit" and Geburtsdatum (ISO date or Unix seconds).',
				routing: {
					send: {
						property: 'Fahrer',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
				operation: ['Create KFZ Contract Products'],
			},
		},
	},
];

export default [
	...GetSparteProductTemplate,
	...GetContractProducts,
	...UpdateContractProducts,
	...CreateKfzContractProducts,
];
