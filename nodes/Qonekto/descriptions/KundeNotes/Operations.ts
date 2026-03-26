import { INodeProperties } from 'n8n-workflow';

export const KundeNotes: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Kunde Notes'],
			},
		},
		options: [
			{
				name: 'List Customer Notes',
				value: 'List Customer Notes',
				action: 'List customer notes',
				routing: {
					request: {
						method: 'GET',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/notes',
					},
				},
			},
			{
				name: 'Add Customer Note',
				value: 'Add Customer Note',
				action: 'Add customer note',
				routing: {
					request: {
						method: 'POST',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/notes',
					},
				},
			},
			{
				name: 'Edit Customer Note',
				value: 'Edit Customer Note',
				action: 'Edit customer note',
				routing: {
					request: {
						method: 'PUT',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/notes/{{$parameter["note"]}}',
					},
				},
			},
			{
				name: 'Delete Customer Note',
				value: 'Delete Customer Note',
				action: 'Delete customer note',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/kunde/{{$parameter["kunde_ameise_id"]}}/notes/{{$parameter["note"]}}',
					},
				},
			},
		],
		default: 'List Customer Notes',
	},
];

export default KundeNotes;
