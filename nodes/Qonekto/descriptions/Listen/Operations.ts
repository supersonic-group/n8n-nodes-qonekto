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
				description: 'Anreden',
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
				description: 'Gesellschaften',
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
				action: 'Kunden-Detail-Felder',
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
				value: 'L-nder',
				action: 'Länder',
				description: 'Länder',
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
				description: 'Rechtsformen',
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
				description: 'Sparten',
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
				description: 'Status',
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
				description: 'Vermittler',
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
				description: 'Zahlweisen',
				routing: {
					request: {
						method: 'GET',
						url: '=/zahlweisen',
					},
				},
			},
		],
		default: '',
	},
];

export default Listen;
