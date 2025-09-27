import { INodeProperties } from 'n8n-workflow';

export const operations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
			},
		},
		options: [
			{
				name: 'Upload File',
				value: 'uploadFile',
				action: 'Upload file',
				description: 'Upload provided file to Kontakthistorie',
				routing: {
					request: {
						method: 'POST',
						url: '=kunde/{{$parameter.kunde_ameise_id}}/archiveintrag',
						body: {
							mode: 'form-data',
						},
					},
				},
			},
			{
				name: 'Create File',
				value: 'createFile',
				action: 'Create file',
				description: 'Create file with provided content in Kontakthistorie',
				routing: {},
			},
		],
		default: 'uploadFile',
	},
];

export const fields: INodeProperties[] = [];

export default {
	operations,
	fields,
};
