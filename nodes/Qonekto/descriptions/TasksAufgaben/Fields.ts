import { INodeProperties } from 'n8n-workflow';

export const ListTasks: INodeProperties[] = [];

export const CreateTask: INodeProperties[] = [
	{
		displayName: 'Assignee',
		required: true,
		name: 'assignee',
		type: 'string',
		default: '',
		description: 'Value muss mindestens 8 Zeichen lang sein. value darf maximal 255 Zeichen haben.',
		routing: {
			send: {
				property: 'assignee',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		displayName: 'Title',
		required: true,
		name: 'title',
		type: 'string',
		default: '',
		description: 'Value muss mindestens 1 Zeichen lang sein. value darf maximal 100 Zeichen haben.',
		routing: {
			send: {
				property: 'title',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		displayName: 'Priority',
		required: true,
		name: 'priority',
		type: 'options',
		default: 'high',
		options: [
			{
				name: 'Low',
				value: 'low',
			},
			{
				name: 'Medium',
				value: 'medium',
			},
			{
				name: 'High',
				value: 'high',
			},
			{
				name: 'Highest',
				value: 'highest',
			},
		],
		routing: {
			send: {
				property: 'priority',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		displayName: 'Status',
		required: true,
		name: 'status',
		type: 'options',
		default: 'open',
		options: [
			{
				name: 'Open',
				value: 'open',
			},
		],
		routing: {
			send: {
				property: 'status',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Value darf maximal 1000 Zeichen haben',
		routing: {
			send: {
				property: 'description',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'string',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'dueDate',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		displayName: 'Resources',
		name: 'resources',
		type: 'json',
		default: 'null',
		routing: {
			send: {
				property: 'resources',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
];

export const GetTask: INodeProperties[] = [];

export const UpdateTask: INodeProperties[] = [
	{
		displayName: 'Assignee',
		required: true,
		name: 'assignee',
		type: 'string',
		default: '',
		description: 'Value muss mindestens 8 Zeichen lang sein. value darf maximal 255 Zeichen haben.',
		routing: {
			send: {
				property: 'assignee',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		displayName: 'Title',
		required: true,
		name: 'title',
		type: 'string',
		default: '',
		description: 'Value muss mindestens 1 Zeichen lang sein. value darf maximal 100 Zeichen haben.',
		routing: {
			send: {
				property: 'title',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		displayName: 'Priority',
		required: true,
		name: 'priority',
		type: 'options',
		default: 'high',
		options: [
			{
				name: 'Low',
				value: 'low',
			},
			{
				name: 'Medium',
				value: 'medium',
			},
			{
				name: 'High',
				value: 'high',
			},
			{
				name: 'Highest',
				value: 'highest',
			},
		],
		routing: {
			send: {
				property: 'priority',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		displayName: 'Status',
		required: true,
		name: 'status',
		type: 'options',
		default: 'open',
		options: [
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'Closed',
				value: 'closed',
			},
		],
		routing: {
			send: {
				property: 'status',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Value darf maximal 1000 Zeichen haben',
		routing: {
			send: {
				property: 'description',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'string',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'dueDate',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		displayName: 'Resources',
		name: 'resources',
		type: 'json',
		default: 'null',
		routing: {
			send: {
				property: 'resources',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
];

export const DeleteTask: INodeProperties[] = [];

export const ChangeTaskStatus: INodeProperties[] = [
	{
		displayName: 'PATCH /aufgabe/{taskId}/status',
		name: 'operation',
		type: 'notice',
		typeOptions: {
			theme: 'info',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Change Task Status'],
			},
		},
	},
	{
		displayName: 'Status',
		required: true,
		name: 'status',
		type: 'options',
		default: 'open',
		options: [
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'Closed',
				value: 'closed',
			},
		],
		routing: {
			send: {
				property: 'status',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Change Task Status'],
			},
		},
	},
];

export default [
	...ListTasks,
	...CreateTask,
	...GetTask,
	...UpdateTask,
	...DeleteTask,
	...ChangeTaskStatus,
];
