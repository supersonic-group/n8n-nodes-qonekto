import { INodeProperties } from 'n8n-workflow';

export const Vertrag: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Vertrag'],
			},
		},
		options: [
			{
				name: 'List Vertraege',
				value: 'List Vertraege',
				action: 'List vertraege',
				routing: {
					request: {
						method: 'GET',
						url: '=/vertrag',
					},
				},
			},
			{
				name: 'Filter Vertraege',
				value: 'Filter Vertraege',
				action: 'Filter vertraege',
				routing: {
					request: {
						method: 'POST',
						url: '=/vertrag/filter',
					},
				},
			},
			{
				name: 'Create Vertrag',
				value: 'Create Vertrag',
				action: 'Create vertrag',
				routing: {
					request: {
						method: 'POST',
						url: '=/vertrag',
					},
				},
			},
			{
				name: 'Show Vertrag',
				value: 'Show Vertrag',
				action: 'Show vertrag',
				routing: {
					request: {
						method: 'GET',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}',
					},
				},
			},
		],
		default: 'List Vertraege',
	},
];

export default Vertrag;
