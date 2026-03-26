import { INodeProperties } from 'n8n-workflow';
import { TaskShared } from './Shared';

export const ListTasks: INodeProperties[] = [];

export const CreateTask: INodeProperties[] = [
	{
		...TaskShared['Assignee'],
		required: true,
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		...TaskShared['Title'],
		required: true,
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		...TaskShared['Priority'],
		required: true,
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		...TaskShared['Status'],
		required: true,
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
	{
		displayName: 'Optional Fields',
		name: 'optional fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{ ...TaskShared['Description'] },
			{ ...TaskShared['Due Date'] },
			{ ...TaskShared['Resources'] },
		],
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Create Task'],
			},
		},
	},
];

export const GetTask: INodeProperties[] = [
	{
		...TaskShared['Task ID'],
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Get Task'],
			},
		},
	},
];

export const UpdateTask: INodeProperties[] = [
	{
		...TaskShared['Task ID'],
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		...TaskShared['Assignee'],
		required: true,
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		...TaskShared['Title'],
		required: true,
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		...TaskShared['Priority'],
		required: true,
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		...TaskShared['Status'],
		required: true,
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
	{
		displayName: 'Optional Fields',
		name: 'optional fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{ ...TaskShared['Description'] },
			{ ...TaskShared['Due Date'] },
			{ ...TaskShared['Resources'] },
		],
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Update Task'],
			},
		},
	},
];

export const DeleteTask: INodeProperties[] = [
	{
		...TaskShared['Task ID'],
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Delete Task'],
			},
		},
	},
];

export const ChangeTaskStatus: INodeProperties[] = [
	{
		...TaskShared['Task ID'],
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['Change Task Status'],
			},
		},
	},
	{
		...TaskShared['Status'],
		required: true,
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
