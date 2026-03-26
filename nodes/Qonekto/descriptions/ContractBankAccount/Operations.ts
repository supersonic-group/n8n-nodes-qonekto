import { INodeProperties } from 'n8n-workflow';

export const ContractBankAccount: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ContractBankAccount'],
			},
		},
		options: [
			{
				name: 'Get Contract Bank Account',
				value: 'Get Contract Bank Account',
				action: 'Get contract bank account',
				routing: {
					request: {
						method: 'GET',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}/bank-account',
					},
				},
			},
			{
				name: 'Change Contract Bank Account',
				value: 'Change Contract Bank Account',
				action: 'Change contract bank account',
				routing: {
					request: {
						method: 'PUT',
						url: '=/vertrag/{{$parameter["vertrag_ameise_id"]}}/bank-account',
					},
				},
			},
		],
		default: 'Get Contract Bank Account',
	},
];

export default ContractBankAccount;
