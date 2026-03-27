import { INodeProperties } from 'n8n-workflow';

export const TaskShared: Record<string, INodeProperties> = {
	'Task ID': {
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the task',
	},
	Assignee: {
		displayName: 'Assignee',
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
	},
	Title: {
		displayName: 'Title',
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
	},
	Priority: {
		displayName: 'Priority',
		name: 'priority',
		type: 'options',
		default: 'medium',
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
	},
	Status: {
		displayName: 'Status',
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
	},
	Description: {
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
	},
	'Due Date': {
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'dueDate',
				propertyInDotNotation: false,
				type: 'body',
				value:
					'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
			},
		},
	},
	Resources: {
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
	},
};
