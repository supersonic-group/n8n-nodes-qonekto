import { INodeProperties } from 'n8n-workflow';

export const KundeRelations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['KundeRelations'],
			},
		},
		options: [
			{
				name: 'List Customer Relations',
				value: 'List Customer Relations',
				action: 'List customer relations',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/relations',
					},
				},
			},
			{
				name: 'Create Customer Relation',
				value: 'Create Customer Relation',
				action: 'Create customer relation',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/relations',
					},
				},
			},
			{
				name: 'Delete Customer Relation',
				value: 'Delete Customer Relation',
				action: 'Delete customer relation',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/relations/{{$parameter["relatedKunde"]}}',
					},
				},
			},
		],
		default: 'List Customer Relations',
	},
];

export default KundeRelations;
