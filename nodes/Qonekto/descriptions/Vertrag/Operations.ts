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
				name: 'Create Contract',
				value: 'Create Vertrag',
				action: 'Create contract',
				routing: {
					request: {
						method: 'POST',
						url: '=/vertrag',
					},
				},
			},
			{
				name: 'Filter Contracts',
				value: 'Filter Vertraege',
				action: 'Filter contracts',
				routing: {
					request: {
						method: 'POST',
						url: '=/vertrag/filter',
					},
				},
			},
			{
				name: 'Get Contract',
				value: 'Show Vertrag',
				action: 'Get contract',
				routing: {
					request: {
						method: 'GET',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}',
					},
				},
			},
			{
				name: 'List Contracts',
				value: 'List Vertraege',
				action: 'List contracts',
				routing: {
					request: {
						method: 'GET',
						url: '=/vertrag',
					},
				},
			},
			{
				name: 'List Documents',
				value: 'List Documents',
				action: 'List documents',
				description:
					'List the archive entries assigned to a contract. Contract documents carry no type and no attachments.',
				routing: {
					request: {
						method: 'GET',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}/dokument',
					},
				},
			},
		],
		default: 'List Vertraege',
	},
];

export default Vertrag;
