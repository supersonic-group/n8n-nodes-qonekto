import { IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { IExecuteSingleFunctions } from 'n8n-workflow/dist/esm/interfaces';
import { Shared } from '../Kunde/Shared';
import { DATETIME_WITH_OFFSET_VALUE } from '../Routing';

// The value expression turns an empty birthdate into null; the connector accepts that, but an
// omitted key is what the request means, and it is safe against connectors that validate the key.
async function omitEmptyBirthdate(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = requestOptions.body as Record<string, unknown> | undefined;
	if (body !== undefined && (body.birthdate === null || body.birthdate === '')) {
		delete body.birthdate;
	}

	return requestOptions;
}

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
		displayName: 'Deviant',
		name: 'deviant',
		type: 'boolean',
		default: false,
		required: true,
		description:
			'Whether the bank account holder differs from the contract holder. Turn on to enter the holder details.',
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
		displayName: 'Firstname',
		name: 'firstname',
		type: 'string',
		default: '',
		required: true,
		description: 'Only needed if the account holder differs from the contract holder',
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
				deviant: [true],
			},
		},
	},
	{
		displayName: 'Lastname',
		name: 'lastname',
		type: 'string',
		default: '',
		required: true,
		description: 'Only needed if the account holder differs from the contract holder',
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
				deviant: [true],
			},
		},
	},
	{
		displayName: 'Birthdate',
		name: 'birthdate',
		type: 'dateTime',
		default: '',
		description: 'Optional. SEPA does not require a birthdate. Left empty, it is not sent.',
		routing: {
			send: {
				property: 'birthdate',
				propertyInDotNotation: false,
				type: 'body',
				value: DATETIME_WITH_OFFSET_VALUE,
				preSend: [omitEmptyBirthdate],
			},
		},
		displayOptions: {
			show: {
				resource: ['ContractBankAccount'],
				operation: ['Change Contract Bank Account'],
				deviant: [true],
			},
		},
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		default: '',
		required: true,
		description: 'Only needed if the account holder differs from the contract holder',
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
				deviant: [true],
			},
		},
	},
	{
		...Shared['Land ID'],
		displayName: 'Nation',
		name: 'nation',
		required: true,
		description: 'Only needed if the account holder differs from the contract holder',
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
				deviant: [true],
			},
		},
	},
	{
		displayName: 'Zip',
		name: 'zip',
		type: 'string',
		default: '',
		required: true,
		description: 'Only needed if the account holder differs from the contract holder',
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
				deviant: [true],
			},
		},
	},
	{
		displayName: 'Street',
		name: 'street',
		type: 'string',
		default: '',
		required: true,
		description: 'Only needed if the account holder differs from the contract holder',
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
				deviant: [true],
			},
		},
	},
];

export default [...GetContractBankAccount, ...ChangeContractBankAccount];
