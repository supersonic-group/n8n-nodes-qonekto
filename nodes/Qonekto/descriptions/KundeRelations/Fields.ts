import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';

export const ListCustomerRelations: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeRelations'],
				operation: ['List Customer Relations'],
			},
		},
	},
];

export const CreateCustomerRelation: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeRelations'],
				operation: ['Create Customer Relation'],
			},
		},
	},
	{
		displayName: 'Related Customer ID',
		name: 'relatedCustomerId',
		type: 'string',
		required: true,
		default: '',
		description: 'Value muss mindestens 1 Zeichen lang sein. value darf maximal 14 Zeichen haben.',
		routing: {
			send: {
				property: 'relatedCustomerId',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeRelations'],
				operation: ['Create Customer Relation'],
			},
		},
	},
	{
		displayName: 'Relation Text',
		name: 'relationText',
		type: 'string',
		required: true,
		default: '',
		description: 'Value muss mindestens 1 Zeichen lang sein. value darf maximal 50 Zeichen haben.',
		routing: {
			send: {
				property: 'relationText',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeRelations'],
				operation: ['Create Customer Relation'],
			},
		},
	},
	{
		displayName: 'Inverse Relation Text',
		name: 'inverseRelationText',
		type: 'string',
		required: true,
		default: '',
		description: 'Value muss mindestens 1 Zeichen lang sein. value darf maximal 50 Zeichen haben.',
		routing: {
			send: {
				property: 'inverseRelationText',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeRelations'],
				operation: ['Create Customer Relation'],
			},
		},
	},
];

export const DeleteCustomerRelation: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeRelations'],
				operation: ['Delete Customer Relation'],
			},
		},
	},
	{
		displayName: 'Related Kunde ID',
		name: 'relatedKunde',
		type: 'string',
		required: true,
		default: '',
		description: 'The Ameise ID of the related Kunde',
		displayOptions: {
			show: {
				resource: ['KundeRelations'],
				operation: ['Delete Customer Relation'],
			},
		},
	},
];

export default [...ListCustomerRelations, ...CreateCustomerRelation, ...DeleteCustomerRelation];
