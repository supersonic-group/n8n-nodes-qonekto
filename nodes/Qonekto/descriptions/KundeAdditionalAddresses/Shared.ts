import { INodeProperties } from 'n8n-workflow';
import { Shared as KundeShared } from '../Kunde/Shared';

export const AddressShared: Record<string, INodeProperties> = {
	'Address ID': {
		displayName: 'Address ID',
		name: 'address',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the additional address',
	},
	Type: {
		displayName: 'Type',
		name: 'type',
		type: 'options',
		default: 'firma',
		options: [
			{
				name: 'Ferienhaus',
				value: 'ferienhaus',
			},
			{
				name: 'Zweitwohnsitz',
				value: 'zweitwohnsitz',
			},
			{
				name: 'Arbeitgeber',
				value: 'arbeitgeber',
			},
			{
				name: 'Firma',
				value: 'firma',
			},
			{
				name: 'Praxis',
				value: 'praxis',
			},
			{
				name: 'Kanzlei',
				value: 'kanzlei',
			},
			{
				name: 'Buero',
				value: 'buero',
			},
			{
				name: 'Lager',
				value: 'lager',
			},
			{
				name: 'Niederlassung',
				value: 'niederlassung',
			},
			{
				name: 'Garage',
				value: 'garage',
			},
			{
				name: 'Filiale',
				value: 'filiale',
			},
			{
				name: 'Sonstiges',
				value: 'sonstiges',
			},
		],
		routing: {
			send: {
				property: 'type',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	Nation: {
		...KundeShared['Land ID'],
		displayName: 'Nation',
		name: 'nation',
		routing: {
			send: {
				property: 'nation',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Address Supplement': {
		displayName: 'Address Supplement',
		name: 'addressSupplement',
		type: 'string',
		default: '',
		description: 'Value darf maximal 80 Zeichen haben',
		routing: {
			send: {
				property: 'addressSupplement',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	Street: {
		displayName: 'Street',
		name: 'street',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'street',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	Zip: {
		displayName: 'Zip',
		name: 'zip',
		type: 'string',
		default: '',
		description: 'Must match the regex /^d+$/',
		routing: {
			send: {
				property: 'zip',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	City: {
		displayName: 'City',
		name: 'city',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'city',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Living Space SQM': {
		displayName: 'Living Space SQM',
		name: 'livingSpaceSQM',
		type: 'number',
		default: '',
		routing: {
			send: {
				property: 'livingSpaceSQM',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
};
