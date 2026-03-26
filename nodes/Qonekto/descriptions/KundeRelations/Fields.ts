import { INodeProperties } from 'n8n-workflow';

export const ListCustomerRelations: INodeProperties[] = [];

export const CreateCustomerRelation: INodeProperties[] = [
	{
		displayName: 'Related Customer ID',
		required: true,
		name: 'relatedCustomerId',
		type: 'string',
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
		required: true,
		name: 'relationText',
		type: 'string',
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
		required: true,
		name: 'inverseRelationText',
		type: 'string',
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

export const DeleteCustomerRelation: INodeProperties[] = [];

export default [...ListCustomerRelations, ...CreateCustomerRelation, ...DeleteCustomerRelation];
