import { INodeProperties } from 'n8n-workflow';

export const ContractProducts: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ContractProducts'],
			},
		},
		options: [
			{
				name: 'Get Sparte Product Template',
				value: 'Get Sparte Product Template',
				action: 'Get sparte product template',
				routing: {
					request: {
						method: 'GET',
						url: '=/sparte/{{$parameter["sparte_ameise_id"]}}/produkttemplate',
					},
				},
			},
			{
				name: 'Get Contract Products',
				value: 'Get Contract Products',
				action: 'Get contract products',
				routing: {
					request: {
						method: 'GET',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}/produkte',
					},
				},
			},
			{
				name: 'Update Contract Products',
				value: 'Update Contract Products',
				action: 'Update contract products',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}/produkte',
						// AktualisierungsAnweisung[] goes out as a top-level JSON array, so the
						// body is set here rather than assembled from per-field `send` routings.
						body: '={{ JSON.parse($parameter["anweisungen"]) }}',
					},
				},
			},
			{
				name: 'Create KFZ Contract Products',
				value: 'Create KFZ Contract Products',
				action: 'Create kfz contract products',
				routing: {
					request: {
						method: 'PUT',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}/produkte',
					},
				},
			},
		],
		default: 'Get Sparte Product Template',
	},
];

export default ContractProducts;
