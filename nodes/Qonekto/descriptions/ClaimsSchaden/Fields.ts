import { INodeProperties } from 'n8n-workflow';

export const ListClaimsByContract: INodeProperties[] = [];

export const CreateClaim: INodeProperties[] = [
	{
		displayName: 'Status',
		required: true,
		name: 'status',
		type: 'options',
		default: 'offen',
		options: [
			{
				name: 'Offen',
				value: 'offen',
			},
			{
				name: 'Geschlossen',
				value: 'geschlossen',
			},
		],
		routing: {
			send: {
				property: 'status',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Create Claim'],
			},
		},
	},
	{
		displayName: 'Custom Number',
		name: 'customNumber',
		type: 'string',
		default: '',
		description: 'Value darf maximal 36 Zeichen haben',
		routing: {
			send: {
				property: 'customNumber',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Create Claim'],
			},
		},
	},
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		default: '',
		description: 'Value darf maximal 1000 Zeichen haben',
		routing: {
			send: {
				property: 'comment',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Create Claim'],
			},
		},
	},
	{
		displayName: 'Claim Date',
		name: 'claimDate',
		type: 'string',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'claimDate',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Create Claim'],
			},
		},
	},
	{
		displayName: 'Notification Date',
		name: 'notificationDate',
		type: 'string',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'notificationDate',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Create Claim'],
			},
		},
	},
];

export const ListClaimsByCustomer: INodeProperties[] = [];

export const GetClaimStatuses: INodeProperties[] = [];

export const GetClaim: INodeProperties[] = [];

export const UpdateClaim: INodeProperties[] = [
	{
		displayName: 'Status',
		required: true,
		name: 'status',
		type: 'options',
		default: 'offen',
		options: [
			{
				name: 'Offen',
				value: 'offen',
			},
			{
				name: 'Geschlossen',
				value: 'geschlossen',
			},
		],
		routing: {
			send: {
				property: 'status',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Update Claim'],
			},
		},
	},
	{
		displayName: 'Custom Number',
		name: 'customNumber',
		type: 'string',
		default: '',
		description: 'Value darf maximal 36 Zeichen haben',
		routing: {
			send: {
				property: 'customNumber',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Update Claim'],
			},
		},
	},
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		default: '',
		description: 'Value darf maximal 1000 Zeichen haben',
		routing: {
			send: {
				property: 'comment',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Update Claim'],
			},
		},
	},
	{
		displayName: 'Claim Date',
		name: 'claimDate',
		type: 'string',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'claimDate',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Update Claim'],
			},
		},
	},
	{
		displayName: 'Notification Date',
		name: 'notificationDate',
		type: 'string',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'notificationDate',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
				operation: ['Update Claim'],
			},
		},
	},
];

export const DeleteClaim: INodeProperties[] = [];

export default [
	...ListClaimsByContract,
	...CreateClaim,
	...ListClaimsByCustomer,
	...GetClaimStatuses,
	...GetClaim,
	...UpdateClaim,
	...DeleteClaim,
];
