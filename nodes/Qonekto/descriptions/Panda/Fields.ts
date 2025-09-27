import { INodeProperties } from 'n8n-workflow';

export const GetAllCustomerLinks: INodeProperties[] = [];

export const CreateACustomerLink: INodeProperties[] = [
	{
		displayName: 'Import Customer',
		name: 'import-customer',
		description:
			'If query parameter exists, customer will be imported into Panda if it does not exist yet before calling function',
		default: '',
		type: 'string',
		routing: {
			send: {
				type: 'query',
				property: 'import-customer',
				value: '={{ $value }}',
				propertyInDotNotation: false,
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
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'number',
		default: 16,
		required: true,
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
		description: 'Value muss eine gültige E-Mail-Adresse sein',
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
		displayName: 'Customer ID',
		name: 'customerId',
		required: true,
		description: 'Customer Ameise ID',
		default: '',
		type: 'string',
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

export const CreateATender: INodeProperties[] = [
	{
		displayName: 'Import Customer',
		name: 'import-customer',
		description:
			'If query parameter exists, customer will be imported into Panda if it does not exist yet before calling function',
		default: '',
		type: 'string',
		routing: {
			send: {
				type: 'query',
				property: 'import-customer',
				value: '={{ $value }}',
				propertyInDotNotation: false,
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
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'number',
		default: 16,
		required: true,
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
1: Betriebshaftpflicht
2: Geschäftsinhalt
3: gewerbliche Rechtsschutz
4: Cyber
5: gewerbliches Gebäude
80: MultiRisk
6: Vermögensschadenhaftpflicht
7: Berufshaftpflicht für Ärzte
8: Maschinen (stationär)
9: Berufshaftpflicht für Architekten und Ingenieure
11: Unternehmens D&O
12: persönliche D&O
17: Elektronik
28: Warenkredit
27: Mietkaution
15: Vertrauensschaden
26: Kaution
16: Glasbruch
24: Warentransport
23: Autoinhalt (Werkverkehr)
10: Maschinen (mobil)
20: Montage
41: KFZ Handel-Handwerk
38: Gruppen-Unfall
25: Verkehrshaftung
31: Betriebskosten-/Praxisausfall (infolge Krankheit)
34: Berufshaftpflicht für Architekten und Ingenieure (Objektschadendeckung)
14: Bauherrenhaftpflicht (gewerblich)
21: Bauleistung (gewerblich)
47: KFZ Flotten
48: Private Krankenvollversicherung
49: Berufsunfähigkeit
50: Wohngebäude
51: Risikoleben
52: Betriebsunterbrechung (MBU)
53: KV Zusatz
54: PKW (BETA)
55: Hausrat (BETA)
56: Tierkrankenversicherung (BETA)
57: Unfallversicherung (BETA)
58: Privat-Rechtsschutz (BETA)
59: Veranstaltungshaftpflicht (BETA)
61: KFZ Old / Youngtimer
62: KFZ Premium Cars / Exoten
63: Privathaftpflicht
64: Hundehalterhaftpflicht
65: Pferdehalterhaftpflicht`,
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

export const ImportsAnAmeiseCustomerIntoPanda: INodeProperties[] = [];

export default [
	...GetAllCustomerLinks,
	...CreateACustomerLink,
	...GetActiveTendersForACustomer,
	...CreateATender,
	...ImportsAnAmeiseCustomerIntoPanda,
];
