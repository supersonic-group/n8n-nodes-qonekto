import { INodeProperties } from 'n8n-workflow';

export const ListCustomerNotes: INodeProperties[] = [];

export const AddCustomerNote: INodeProperties[] = [
	{
		displayName: 'Type',
		required: true,
		name: 'type',
		type: 'options',
		default: 'default',
		options: [
			{
				name: 'Default',
				value: 'default',
			},
			{
				name: 'Info',
				value: 'info',
			},
			{
				name: 'Warning',
				value: 'warning',
			},
		],
		routing: {
			send: {
				property: 'type',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Add Customer Note'],
			},
		},
	},
	{
		displayName: 'Text',
		required: true,
		name: 'text',
		type: 'string',
		default: '',
		description: 'Value muss mindestens 1 Zeichen lang sein. value darf maximal 500 Zeichen haben.',
		routing: {
			send: {
				property: 'text',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Add Customer Note'],
			},
		},
	},
];

export const EditCustomerNote: INodeProperties[] = [
	{
		displayName: 'Type',
		required: true,
		name: 'type',
		type: 'options',
		default: 'default',
		options: [
			{
				name: 'Default',
				value: 'default',
			},
			{
				name: 'Info',
				value: 'info',
			},
			{
				name: 'Warning',
				value: 'warning',
			},
		],
		routing: {
			send: {
				property: 'type',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Edit Customer Note'],
			},
		},
	},
	{
		displayName: 'Text',
		required: true,
		name: 'text',
		type: 'string',
		default: '',
		description: 'Value muss mindestens 1 Zeichen lang sein. value darf maximal 500 Zeichen haben.',
		routing: {
			send: {
				property: 'text',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Edit Customer Note'],
			},
		},
	},
];

export const DeleteCustomerNote: INodeProperties[] = [];

export default [
	...ListCustomerNotes,
	...AddCustomerNote,
	...EditCustomerNote,
	...DeleteCustomerNote,
];
