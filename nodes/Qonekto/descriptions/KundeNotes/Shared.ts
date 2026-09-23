import { INodeProperties } from 'n8n-workflow';

export const KundeNotesShared: Record<string, INodeProperties> = {
	'Note ID': {
		displayName: 'Note ID',
		name: 'note',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the note',
	},
	Type: {
		displayName: 'Type',
		name: 'type',
		type: 'options',
		default: 'default',
		required: true,
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
	},
	Text: {
		displayName: 'Text',
		name: 'text',
		type: 'string',
		default: '',
		required: true,
		description: 'Must be between 1 and 500 characters',
		routing: {
			send: {
				property: 'text',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
};
