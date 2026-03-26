import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';
import { AddressShared } from './Shared';

export const ListCustomerAdditionalAddresses: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['List Customer Additional Addresses'],
			},
		},
	},
];

export const CreateCustomerAdditionalAddress: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Create Customer Additional Address'],
			},
		},
	},
	{
		...AddressShared['Type'],
		required: true,
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Create Customer Additional Address'],
			},
		},
	},
	{
		...AddressShared['Nation'],
		required: true,
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Create Customer Additional Address'],
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
			{ ...AddressShared['Address Supplement'] },
			{ ...AddressShared['Street'] },
			{ ...AddressShared['Zip'] },
			{ ...AddressShared['City'] },
		],
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
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
	{
		...AddressShared['Address ID'],
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
	{
		...AddressShared['Type'],
		required: true,
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
	{
		...AddressShared['Nation'],
		required: true,
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
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
			{ ...AddressShared['Address Supplement'] },
			{ ...AddressShared['Street'] },
			{ ...AddressShared['Zip'] },
			{ ...AddressShared['City'] },
			{ ...AddressShared['Living Space SQM'] },
		],
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Update Customer Additional Address'],
			},
		},
	},
];

export const DeleteCustomerAdditionalAddress: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Delete Customer Additional Address'],
			},
		},
	},
	{
		...AddressShared['Address ID'],
		displayOptions: {
			show: {
				resource: ['KundeAdditionalAddresses'],
				operation: ['Delete Customer Additional Address'],
			},
		},
	},
];

export default [
	...ListCustomerAdditionalAddresses,
	...CreateCustomerAdditionalAddress,
	...UpdateCustomerAdditionalAddress,
	...DeleteCustomerAdditionalAddress,
];
