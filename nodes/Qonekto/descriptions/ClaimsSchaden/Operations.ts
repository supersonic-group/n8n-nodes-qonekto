import { INodeProperties } from 'n8n-workflow';

export const ClaimsSchaden: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ClaimsSchaden'],
			},
		},
		options: [
			{
				name: 'List Claims By Contract',
				value: 'List Claims By Contract',
				action: 'List claims by contract',
				routing: {
					request: {
						method: 'GET',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}/schaden',
					},
				},
			},
			{
				name: 'List Claims By Customer',
				value: 'List Claims By Customer',
				action: 'List claims by customer',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/schaden',
					},
				},
			},
			{
				name: 'Create Claim',
				value: 'Create Claim',
				action: 'Create claim',
				routing: {
					request: {
						method: 'POST',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}/schaden',
					},
				},
			},
			{
				name: 'Get Claim',
				value: 'Get Claim',
				action: 'Get claim',
				routing: {
					request: {
						method: 'GET',
						url: '=/schaden/{{$parameter["claimId"]}}',
					},
				},
			},
			{
				name: 'Update Claim',
				value: 'Update Claim',
				action: 'Update claim',
				routing: {
					request: {
						method: 'PUT',
						url: '=/schaden/{{$parameter["claimId"]}}',
					},
				},
			},
			{
				name: 'Delete Claim',
				value: 'Delete Claim',
				action: 'Delete claim',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/schaden/{{$parameter["claimId"]}}',
					},
				},
			},
			{
				name: 'Get Claim Statuses',
				value: 'Get Claim Statuses',
				action: 'Get claim statuses',
				routing: {
					request: {
						method: 'GET',
						url: '=/schaden/statuses',
					},
				},
			},
		],
		default: 'List Claims By Contract',
	},
];

export default ClaimsSchaden;
