import { INodeProperties } from 'n8n-workflow';

export const TriggerPipelineImportFromCRM: INodeProperties[] = [
	{
		displayName: 'Pipeline ID',
		name: 'pipeline_id',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the Pipeline to trigger',
		displayOptions: {
			show: {
				resource: ['Pipeline'],
				operation: ['Trigger Pipeline Import From CRM'],
			},
		},
	},
	{
		displayName: 'Object ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the CRM object to import through the pipeline',
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
