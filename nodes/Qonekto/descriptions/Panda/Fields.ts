import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';

export const GetAllCustomerLinks: INodeProperties[] = [];

export const CreateACustomerLink: INodeProperties[] = [
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		default: 'basic_analysis',
		required: true,
		options: [
			{
				name: 'Basic Analysis',
				value: 'basic_analysis',
			},
			{
				name: 'Risk',
				value: 'risk',
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
				resource: ['Panda'],
				operation: ['Create A Customer Link'],
			},
		},
	},
	{
		...Shared['Kunde Ameise ID'],
		name: 'customerId',
		routing: {
			send: {
				property: 'customerId',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Create A Customer Link'],
			},
		},
	},
	{
		displayName: 'Tender ID',
		name: 'tenderId',
		type: 'string',
		default: '',
		description: 'This field is required when <code>type</code> is <code>risk</code>',
		routing: {
			send: {
				property: 'tenderId',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Create A Customer Link'],
			},
		},
	},
	{
		displayName: 'Handle Emails',
		name: 'handleEmails',
		type: 'boolean',
		default: true,
		required: true,
		routing: {
			send: {
				property: 'handleEmails',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Create A Customer Link'],
			},
		},
	},
	{
		displayName: 'Require Answers',
		name: 'requireAnswers',
		type: 'boolean',
		default: false,
		required: true,
		routing: {
			send: {
				property: 'requireAnswers',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Create A Customer Link'],
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		description: 'Must be a valid email address',
		routing: {
			send: {
				property: 'email',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Create A Customer Link'],
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'message',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Create A Customer Link'],
			},
		},
	},
];

export const GetActiveTendersForACustomer: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		name: 'customerId',
		routing: {
			send: {
				type: 'query',
				property: 'customerId',
				value: '={{ $value }}',
				propertyInDotNotation: false,
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Get Active Tenders For A Customer'],
			},
		},
	},
	{
		displayName: 'Insurance Line ID',
		name: 'insuranceLineId',
		description: 'Panda Insurance Line ID, see "Create a tender" for values',
		default: '',
		type: 'string',
		routing: {
			send: {
				type: 'query',
				property: 'insuranceLineId',
				value: '={{ $value }}',
				propertyInDotNotation: false,
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Get Active Tenders For A Customer'],
			},
		},
	},
];

export const GetATender: INodeProperties[] = [
	{
		displayName: 'Tender ID',
		name: 'tenderId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the tender',
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Get A Tender'],
			},
		},
	},
];

export const CreateATender: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		name: 'customerId',
		routing: {
			send: {
				property: 'customerId',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Create A Tender'],
			},
		},
	},
	{
		displayName: 'Insurance Line ID',
		name: 'insuranceLineId',
		type: 'string',
		default: '',
		required: true,
		description: `Panda Insurance Line ID, possible values:
1: Business liability
2: Business contents
3: Commercial legal expenses
4: Cyber
5: Commercial building
80: MultiRisk
6: Financial loss liability
7: Professional liability for doctors
8: Machinery (stationary)
9: Professional liability for architects and engineers
11: Corporate D&O
12: Personal D&O
17: Electronics
28: Trade credit
27: Rent deposit
15: Fidelity
26: Surety bond
16: Glass breakage
24: Goods in transit
23: Vehicle contents (own-account transport)
10: Machinery (mobile)
20: Erection
41: Motor trade
38: Group accident
25: Carrier liability
31: Business interruption from illness (practice)
34: Professional liability for architects and engineers (project cover)
14: Commercial builder's liability
21: Construction all risks (commercial)
47: Motor fleet
48: Private comprehensive health
49: Occupational disability
50: Residential building
51: Term life
52: Machinery business interruption
53: Supplementary health
54: Car (BETA)
55: Household contents (BETA)
56: Pet health (BETA)
57: Accident (BETA)
58: Private legal expenses (BETA)
59: Event liability (BETA)
61: Classic and youngtimer cars
62: Premium and exotic cars
63: Personal liability
64: Dog owner liability
65: Horse owner liability`,
		routing: {
			send: {
				property: 'insuranceLineId',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Create A Tender'],
			},
		},
	},
];

export const ArchiveATender: INodeProperties[] = [
	{
		displayName: 'Tender ID',
		name: 'tenderId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the tender',
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Archive A Tender'],
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
				displayName: 'Reason',
				name: 'reason',
				type: 'string',
				default: '',
				description: 'Reason why the tender was archived',
				routing: {
					send: {
						property: 'reason',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Panda'],
				operation: ['Archive A Tender'],
			},
		},
	},
];

export default [
	...GetAllCustomerLinks,
	...CreateACustomerLink,
	...GetActiveTendersForACustomer,
	...GetATender,
	...CreateATender,
	...ArchiveATender,
];
