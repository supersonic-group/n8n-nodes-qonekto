import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';
import { returnAllField } from '../Pagination';

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
	returnAllField('KundeRelations', 'List Customer Relations'),
	{
		displayName: 'Pagination Fields',
		name: 'pagination fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 50,
				// Upstream spells it pageSize on this endpoint alone, and silently ignores
				// perPage — a request carrying only perPage comes back as one page holding
				// every record.
				description: 'Number of results per page',
				routing: {
					send: {
						type: 'query',
						property: 'pageSize',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Returns result of given page number',
				routing: {
					send: {
						type: 'query',
						property: 'page',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
		],
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
		description: 'Must be between 1 and 14 characters',
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
		description: 'Must be between 1 and 50 characters',
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
		description: 'Must be between 1 and 50 characters',
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
		displayName: 'Related Customer Ameise ID',
		name: 'relatedKunde',
		type: 'string',
		required: true,
		default: '',
		description: 'The Ameise ID of the related customer',
		displayOptions: {
			show: {
				resource: ['KundeRelations'],
				operation: ['Delete Customer Relation'],
			},
		},
	},
];

export default [...ListCustomerRelations, ...CreateCustomerRelation, ...DeleteCustomerRelation];
