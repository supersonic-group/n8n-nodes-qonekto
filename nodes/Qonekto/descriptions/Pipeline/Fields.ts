import { INodeProperties } from 'n8n-workflow';

export const TriggerPipelineImportFromCRM: INodeProperties[] = [
	{
		displayName: 'Id',
		name: 'id',
		required: true,
		description: '',
		default: '',
		type: 'string',
		routing: {
			send: {
				type: 'query',
				property: 'id',
				value: '={{ $value }}',
				propertyInDotNotation: false,
			},
		},
		displayOptions: {
			show: {
				resource: ['Pipeline'],
				operation: ['Trigger Pipeline Import From CRM'],
			},
		},
	},
];

export default TriggerPipelineImportFromCRM;
