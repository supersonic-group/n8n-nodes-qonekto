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
				name: 'Branch',
				value: 'filiale',
			},
			{
				name: 'Branch Office',
				value: 'niederlassung',
			},
			{
				name: 'Company',
				value: 'firma',
			},
			{
				name: 'Employer',
				value: 'arbeitgeber',
			},
			{
				name: 'Garage',
				value: 'garage',
			},
			{
				name: 'Holiday Home',
				value: 'ferienhaus',
			},
			{
				name: 'Law Office',
				value: 'kanzlei',
			},
			{
				name: 'Office',
				value: 'buero',
			},
			{
				name: 'Other',
				value: 'sonstiges',
			},
			{
				name: 'Practice',
				value: 'praxis',
			},
			{
				name: 'Second Residence',
				value: 'zweitwohnsitz',
			},
			{
				name: 'Warehouse',
				value: 'lager',
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
		description: 'At most 80 characters',
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
		description: 'Must match the regex /^\\d+$/',
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
