import { INodeProperties } from 'n8n-workflow';

export const Resources: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Claim',
				value: 'ClaimsSchaden',
			},
			{
				name: 'Contract',
				value: 'Vertrag',
			},
			{
				name: 'Contract Bank Account',
				value: 'ContractBankAccount',
			},
			{
				name: 'Contract Product',
				value: 'ContractProducts',
			},
			{
				name: 'Customer',
				value: 'Kunde',
			},
			{
				name: 'Customer Additional Address',
				value: 'KundeAdditionalAddresses',
			},
			{
				name: 'Customer Note',
				value: 'KundeNotes',
			},
			{
				name: 'Customer Notification',
				value: 'KundeNotifications',
			},
			{
				name: 'Customer Relation',
				value: 'KundeRelations',
			},
			{
				name: 'Customer Tag',
				value: 'KundeTags',
			},
			{
				name: 'Lookup List',
				value: 'Listen',
			},
			{
				name: 'Misc',
				value: 'Misc',
			},
			{
				name: 'Panda',
				value: 'Panda',
			},
			{
				name: 'Pipeline',
				value: 'Pipeline',
			},
			{
				name: 'Task',
				value: 'TasksAufgaben',
			},
		],
		default: 'Kunde',
	},
];

export default Resources;
