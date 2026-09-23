import { INodeProperties } from 'n8n-workflow';

export const Listen: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Listen'],
			},
		},
		options: [
			{
				name: 'List Brokers',
				value: 'Vermittler',
				action: 'List brokers',
				routing: {
					request: {
						method: 'GET',
						url: '=/vermittler',
					},
				},
			},
			{
				name: 'List Countries',
				value: 'Länder',
				action: 'List countries',
				routing: {
					request: {
						method: 'GET',
						url: '=/laender',
					},
				},
			},
			{
				name: 'List Customer Detail Fields',
				value: 'Kunden Detail Felder',
				action: 'List customer detail fields',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunden_detail_felder',
					},
				},
			},
			{
				name: 'List Divisions',
				value: 'Sparten',
				action: 'List divisions',
				routing: {
					request: {
						method: 'GET',
						url: '=/sparten',
					},
				},
			},
			{
				name: 'List Insurers',
				value: 'Gesellschaften',
				action: 'List insurers',
				routing: {
					request: {
						method: 'GET',
						url: '=/gesellschaften',
					},
				},
			},
			{
				name: 'List Legal Forms',
				value: 'Rechtsformen',
				action: 'List legal forms',
				routing: {
					request: {
						method: 'GET',
						url: '=/rechtsformen',
					},
				},
			},
			{
				name: 'List Payment Methods',
				value: 'Zahlweisen',
				action: 'List payment methods',
				routing: {
					request: {
						method: 'GET',
						url: '=/zahlweisen',
					},
				},
			},
			{
				name: 'List Salutations',
				value: 'Anreden',
				action: 'List salutations',
				routing: {
					request: {
						method: 'GET',
						url: '=/anreden',
					},
				},
			},
			{
				name: 'List Statuses',
				value: 'Status',
				action: 'List statuses',
				routing: {
					request: {
						method: 'GET',
						url: '=/status',
					},
				},
			},
		],
		default: 'Anreden',
	},
];

export default Listen;
