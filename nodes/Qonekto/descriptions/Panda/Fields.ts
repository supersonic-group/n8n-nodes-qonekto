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
		required: true,
		displayName: 'Type',
		name: 'type',
		type: 'options',
		default: 'basic_analysis',
		description: '',
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
		required: true,
		displayName: 'Customer Id',
		name: 'customerId',
		type: 'number',
		default: 16,
		description: '',
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
		displayName: 'Tender Id',
		name: 'tenderId',
		type: 'string',
		default: '',
		description: 'This field is required when <code>type</code> is <code>risk</code>.',
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
		required: true,
		displayName: 'Handle Emails',
		name: 'handleEmails',
		type: 'boolean',
		default: true,
		description: '',
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
		required: true,
		displayName: 'Require Answers',
		name: 'requireAnswers',
		type: 'boolean',
		default: false,
		description: '',
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
		default: '',
		description: 'value muss eine gültige E-Mail-Adresse sein.',
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
		description: '',
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
		displayName: 'Customer Id',
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
		displayName: 'Insurance Line Id',
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
		required: true,
		displayName: 'Customer Id',
		name: 'customerId',
		type: 'number',
		default: 16,
		description: '',
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
		required: true,
		displayName: 'Insurance Line Id',
		name: 'insuranceLineId',
		type: 'string',
		default: '',
		description:
			'Panda Insurance Line ID, possible values:<br>\n1: Betriebshaftpflicht<br>\n2: Geschäftsinhalt<br>\n3: gewerbliche Rechtsschutz<br>\n4: Cyber<br>\n5: gewerbliches Gebäude<br>\n80: MultiRisk<br>\n6: Vermögensschadenhaftpflicht<br>\n7: Berufshaftpflicht für Ärzte<br>\n8: Maschinen (stationär)<br>\n9: Berufshaftpflicht für Architekten und Ingenieure<br>\n11: Unternehmens D&O<br>\n12: persönliche D&O<br>\n17: Elektronik<br>\n28: Warenkredit<br>\n27: Mietkaution<br>\n15: Vertrauensschaden<br>\n26: Kaution<br>\n16: Glasbruch<br>\n24: Warentransport<br>\n23: Autoinhalt (Werkverkehr)<br>\n10: Maschinen (mobil)<br>\n20: Montage<br>\n41: KFZ Handel-Handwerk<br>\n38: Gruppen-Unfall<br>\n25: Verkehrshaftung<br>\n31: Betriebskosten-/Praxisausfall (infolge Krankheit)<br>\n34: Berufshaftpflicht für Architekten und Ingenieure (Objektschadendeckung)<br>\n14: Bauherrenhaftpflicht (gewerblich)<br>\n21: Bauleistung (gewerblich)<br>\n47: KFZ Flotten<br>\n48: Private Krankenvollversicherung<br>\n49: Berufsunfähigkeit<br>\n50: Wohngebäude<br>\n51: Risikoleben<br>\n52: Betriebsunterbrechung (MBU)<br>\n53: KV Zusatz<br>\n54: PKW (BETA)<br>\n55: Hausrat (BETA)<br>\n56: Tierkrankenversicherung (BETA)<br>\n57: Unfallversicherung (BETA)<br>\n58: Privat-Rechtsschutz (BETA)<br>\n59: Veranstaltungshaftpflicht (BETA)<br>\n61: KFZ Old / Youngtimer<br>\n62: KFZ Premium Cars / Exoten<br>\n63: Privathaftpflicht<br>\n64: Hundehalterhaftpflicht<br>\n65: Pferdehalterhaftpflicht',
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
