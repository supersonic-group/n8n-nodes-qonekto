import { INodeProperties } from 'n8n-workflow';

export const Resources: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Kunde',
				value: 'Kunde',
			},
			{
				name: 'Kunde Tag',
				value: 'KundeTags',
			},
			{
				name: 'Kunde Additional Address',
				value: 'KundeAdditionalAddresses',
			},
			{
				name: 'Kunde Note',
				value: 'KundeNotes',
			},
			{
				name: 'Kunde Relation',
				value: 'KundeRelations',
			},
			{
				name: 'Kunde Notification',
				value: 'KundeNotifications',
			},
			{
				name: 'Vertrag',
				value: 'Vertrag',
			},
			{
				name: 'Contract Bank Account',
				value: 'ContractBankAccount',
			},
			{
				name: 'Listen',
				value: 'Listen',
			},
			{
				name: 'Panda',
				value: 'Panda',
			},
			{
				name: 'Claims Schaden',
				value: 'ClaimsSchaden',
			},
			{
				name: 'Tasks Aufgaben',
				value: 'TasksAufgaben',
			},
			{
				name: 'Pipeline',
				value: 'Pipeline',
			},
			{
				name: 'Misc',
				value: 'Misc',
			},
		],
		default: 'Kunde',
	},
];

export default Resources;
