import { INodeProperties } from 'n8n-workflow';

export const ListCustomerAdditionalAddresses: INodeProperties[] = [];

export const CreateCustomerAdditionalAddress: INodeProperties[] = [
	{
		displayName: 'Type',
		required: true,
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Create Customer Additional Address'],
			},
		},
	},
	{
		displayName: 'Nation',
		required: true,
		name: 'nation',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'nation',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Create Customer Additional Address'],
			},
		},
	},
	{
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Create Customer Additional Address'],
			},
		},
	},
	{
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Create Customer Additional Address'],
			},
		},
	},
	{
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Create Customer Additional Address'],
			},
		},
	},
	{
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Create Customer Additional Address'],
			},
		},
	},
];

export const UpdateCustomerAdditionalAddress: INodeProperties[] = [
	{
		displayName: 'Type',
		required: true,
		name: 'type',
		type: 'options',
		default: 'sonstiges',
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
	{
		displayName: 'Nation',
		required: true,
		name: 'nation',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'nation',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
	{
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
	{
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
	{
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
	{
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
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
	{
		displayName: 'Living Space SQM',
		name: 'livingSpaceSQM',
		type: 'number',
		default: 16,
		routing: {
			send: {
				property: 'livingSpaceSQM',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
];

export const DeleteCustomerAdditionalAddress: INodeProperties[] = [];

export default [
	...ListCustomerAdditionalAddresses,
	...CreateCustomerAdditionalAddress,
	...UpdateCustomerAdditionalAddress,
	...DeleteCustomerAdditionalAddress,
];
