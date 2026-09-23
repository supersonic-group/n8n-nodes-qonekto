import { INodeProperties } from 'n8n-workflow';
import { TaskShared } from './Shared';
import { DATETIME_WITH_OFFSET_VALUE } from '../Routing';
import { returnAllField } from '../Pagination';

export const ListTasks: INodeProperties[] = [
	{
		displayName: 'Filter Fields',
		name: 'filter fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Assignee',
				name: 'assignee',
				type: 'string',
				default: '',
				description: 'Employee ID of the assignee',
				routing: {
					send: {
						type: 'query',
						property: 'assignee',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Contract',
				name: 'contract',
				type: 'number',
				default: 0,
				description: 'Filters by contract Ameise ID',
				routing: {
					send: {
						type: 'query',
						property: 'contract',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Customer',
				name: 'customer',
				type: 'number',
				default: 0,
				description: 'Filters by customer Ameise ID',
				routing: {
					send: {
						type: 'query',
						property: 'customer',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Due Date From',
				name: 'dueDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Earliest due date, inclusive',
				routing: {
					send: {
						type: 'query',
						property: 'dueDateFrom',
						value: DATETIME_WITH_OFFSET_VALUE,
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Due Date To',
				name: 'dueDateTo',
				type: 'dateTime',
				default: '',
				description: 'Latest due date, inclusive',
				routing: {
					send: {
						type: 'query',
						property: 'dueDateTo',
						value: DATETIME_WITH_OFFSET_VALUE,
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Include Customer Archives',
				name: 'includeCustomerArchives',
				type: 'boolean',
				default: false,
				description: "Whether to include the customer's archives in the results",
				routing: {
					send: {
						type: 'query',
						property: 'includeCustomerArchives',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Include Customer Contracts',
				name: 'includeCustomerContracts',
				type: 'boolean',
				default: false,
				description: "Whether to include the customer's contracts in the results",
				routing: {
					send: {
						type: 'query',
						property: 'includeCustomerContracts',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Priorities',
				name: 'priorities',
				type: 'multiOptions',
				default: [],
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
						type: 'query',
						property: 'priorities',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Searches task title and description',
				routing: {
					send: {
						type: 'query',
						property: 'search',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				default: 'dueDate',
				options: [
					{
						name: 'Title',
						value: 'title',
					},
					{
						name: 'Priority',
						value: 'priority',
					},
					{
						name: 'Due Date',
						value: 'dueDate',
					},
					{
						name: 'Linked Object',
						value: 'linkedObject',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'sortBy',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				default: 'ASC',
				options: [
					{
						name: 'Ascending',
						value: 'ASC',
					},
					{
						name: 'Descending',
						value: 'DESC',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'sortOrder',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Statuses',
				name: 'statuses',
				type: 'multiOptions',
				default: [],
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
						type: 'query',
						property: 'statuses',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
				operation: ['List Tasks'],
			},
		},
	},
	returnAllField('TasksAufgaben', 'List Tasks'),
	{
		displayName: 'Pagination Fields',
		name: 'pagination fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Per Page',
				name: 'perPage',
				type: 'number',
				default: 50,
				// The Tasks API is a passthrough and takes camelCase perPage, unlike the
				// per_page used by the connector's own list endpoints.
				description: 'Number of results per page',
				routing: {
					send: {
						type: 'query',
						property: 'perPage',
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
				resource: ['TasksAufgaben'],
				operation: ['List Tasks'],
			},
		},
	},
];

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
		// A task can only be created open; 'closed' is update-only (TaskRules::createRules).
		options: [
			{
				name: 'Open',
				value: 'open',
			},
		],
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
