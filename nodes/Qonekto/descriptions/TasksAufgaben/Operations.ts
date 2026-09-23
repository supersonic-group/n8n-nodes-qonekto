import { INodeProperties } from 'n8n-workflow';

export const TasksAufgaben: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['TasksAufgaben'],
			},
		},
		options: [
			{
				name: 'Change Task Status',
				value: 'Change Task Status',
				action: 'Change task status',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/aufgabe/{{$parameter["taskId"]}}/status',
					},
				},
			},
			{
				name: 'Create Task',
				value: 'Create Task',
				action: 'Create task',
				routing: {
					request: {
						method: 'POST',
						url: '=/aufgabe',
					},
				},
			},
			{
				name: 'Delete Task',
				value: 'Delete Task',
				action: 'Delete task',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/aufgabe/{{$parameter["taskId"]}}',
					},
				},
			},
			{
				name: 'Get Task',
				value: 'Get Task',
				action: 'Get task',
				routing: {
					request: {
						method: 'GET',
						url: '=/aufgabe/{{$parameter["taskId"]}}',
					},
				},
			},
			{
				name: 'List Tasks',
				value: 'List Tasks',
				action: 'List tasks',
				routing: {
					request: {
						method: 'GET',
						url: '=/aufgabe',
					},
				},
			},
			{
				name: 'Update Task',
				value: 'Update Task',
				action: 'Update task',
				routing: {
					request: {
						method: 'PUT',
						url: '=/aufgabe/{{$parameter["taskId"]}}',
					},
				},
			},
		],
		default: 'List Tasks',
	},
];

export default TasksAufgaben;
