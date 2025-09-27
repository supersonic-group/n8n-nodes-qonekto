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
				name: 'Anreden',
				value: 'Anreden',
				action: 'Anreden',
				routing: {
					request: {
						method: 'GET',
						url: '=/anreden',
					},
				},
			},
			{
				name: 'Gesellschaften',
				value: 'Gesellschaften',
				action: 'Gesellschaften',
				routing: {
					request: {
						method: 'GET',
						url: '=/gesellschaften',
					},
				},
			},
			{
				name: 'Kunden Detail Felder',
				value: 'Kunden Detail Felder',
				action: 'Kunden detail felder',
				description: 'Kunden-Detail-Felder',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunden_detail_felder',
					},
				},
			},
			{
				name: 'Länder',
				value: 'Länder',
				action: 'Laender',
				routing: {
					request: {
						method: 'GET',
						url: '=/laender',
					},
				},
			},
			{
				name: 'Rechtsformen',
				value: 'Rechtsformen',
				action: 'Rechtsformen',
				routing: {
					request: {
						method: 'GET',
						url: '=/rechtsformen',
					},
				},
			},
			{
				name: 'Sparten',
				value: 'Sparten',
				action: 'Sparten',
				routing: {
					request: {
						method: 'GET',
						url: '=/sparten',
					},
				},
			},
			{
				name: 'Status',
				value: 'Status',
				action: 'Status',
				routing: {
					request: {
						method: 'GET',
						url: '=/status',
					},
				},
			},
			{
				name: 'Vermittler',
				value: 'Vermittler',
				action: 'Vermittler',
				routing: {
					request: {
						method: 'GET',
						url: '=/vermittler',
					},
				},
			},
			{
				name: 'Zahlweisen',
				value: 'Zahlweisen',
				action: 'Zahlweisen',
				routing: {
					request: {
						method: 'GET',
						url: '=/zahlweisen',
					},
				},
			},
		],
		default: 'Anreden',
	},
];

export default Listen;
