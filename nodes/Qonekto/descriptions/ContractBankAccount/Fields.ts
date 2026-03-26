import { INodeProperties } from 'n8n-workflow';

export const GetContractBankAccount: INodeProperties[] = [];

export const ChangeContractBankAccount: INodeProperties[] = [
	{
		displayName: 'Iban',
		required: true,
		name: 'iban',
		type: 'string',
		default: '',
		description: 'Value muss mindestens 1 Zeichen lang sein. value darf maximal 34 Zeichen haben.',
		routing: {
			send: {
				property: 'iban',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
			},
		},
	},
	{
		displayName: 'Firstname',
		required: true,
		name: 'firstname',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'firstname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
			},
		},
	},
	{
		displayName: 'Lastname',
		required: true,
		name: 'lastname',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'lastname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
			},
		},
	},
	{
		displayName: 'Deviant',
		required: true,
		name: 'deviant',
		type: 'boolean',
		default: true,
		routing: {
			send: {
				property: 'deviant',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
			},
		},
	},
	{
		displayName: 'Birthdate',
		required: true,
		name: 'birthdate',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'birthdate',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
			},
		},
	},
	{
		displayName: 'City',
		required: true,
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
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
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
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
			},
		},
	},
	{
		displayName: 'Zip',
		required: true,
		name: 'zip',
		type: 'string',
		default: '',
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
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
			},
		},
	},
	{
		displayName: 'Street',
		required: true,
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
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
			},
		},
	},
];

export default [...GetContractBankAccount, ...ChangeContractBankAccount];
