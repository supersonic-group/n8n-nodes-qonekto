import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';
import { ClaimShared } from './Shared';

export const ListClaimsByContract: INodeProperties[] = [
	{
		...Shared['Vertrag Ameise ID'],
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['List Claims By Contract'],
			},
		},
	},
];

export const ListClaimsByCustomer: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['List Claims By Customer'],
			},
		},
	},
];

export const CreateClaim: INodeProperties[] = [
	{
		...Shared['Vertrag Ameise ID'],
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Create Claim'],
			},
		},
	},
	{
		...ClaimShared['Status'],
		required: true,
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Create Claim'],
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
			{ ...ClaimShared['Custom Number'] },
			{ ...ClaimShared['Comment'] },
			{ ...ClaimShared['Claim Date'] },
			{ ...ClaimShared['Notification Date'] },
		],
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Create Claim'],
			},
		},
	},
];

export const GetClaim: INodeProperties[] = [
	{
		...ClaimShared['Claim ID'],
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Get Claim'],
			},
		},
	},
];

export const UpdateClaim: INodeProperties[] = [
	{
		...ClaimShared['Claim ID'],
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Update Claim'],
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
			{ ...ClaimShared['Status'] },
			{ ...ClaimShared['Custom Number'] },
			{ ...ClaimShared['Comment'] },
			{ ...ClaimShared['Claim Date'] },
			{ ...ClaimShared['Notification Date'] },
		],
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Update Claim'],
			},
		},
	},
];

export const DeleteClaim: INodeProperties[] = [
	{
		...ClaimShared['Claim ID'],
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Delete Claim'],
			},
		},
	},
];

export const GetClaimStatuses: INodeProperties[] = [];

export default [
	...ListClaimsByContract,
	...ListClaimsByCustomer,
	...CreateClaim,
	...GetClaim,
	...UpdateClaim,
	...DeleteClaim,
	...GetClaimStatuses,
];
