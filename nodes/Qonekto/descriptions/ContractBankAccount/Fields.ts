import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';
import { DATETIME_WITH_OFFSET_VALUE } from '../Routing';

export const GetContractBankAccount: INodeProperties[] = [
	{
		...Shared['Vertrag Ameise ID'],
		displayOptions: {
			show: {
				resource: ['ContractBankAccount'],
				operation: ['Get Contract Bank Account'],
			},
		},
	},
];

export const ChangeContractBankAccount: INodeProperties[] = [
	{
		...Shared['Vertrag Ameise ID'],
		displayOptions: {
			show: {
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
			},
		},
	},
	{
		displayName: 'IBAN',
		name: 'iban',
		type: 'string',
		default: '',
		required: true,
		description: 'Must be between 1 and 34 characters',
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
		name: 'firstname',
		type: 'string',
		default: '',
		required: true,
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
		name: 'lastname',
		type: 'string',
		default: '',
		required: true,
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
		name: 'deviant',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether the bank account holder differs from the contract holder',
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
		name: 'birthdate',
		type: 'dateTime',
		default: '',
		required: true,
		routing: {
			send: {
				property: 'birthdate',
				propertyInDotNotation: false,
				type: 'body',
				value: DATETIME_WITH_OFFSET_VALUE,
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
		name: 'city',
		type: 'string',
		default: '',
		required: true,
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
		...Shared['Land ID'],
		displayName: 'Nation',
		name: 'nation',
		required: true,
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
		name: 'zip',
		type: 'string',
		default: '',
		required: true,
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
		name: 'street',
		type: 'string',
		default: '',
		required: true,
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
