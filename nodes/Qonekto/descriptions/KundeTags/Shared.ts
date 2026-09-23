import { INodeProperties } from 'n8n-workflow';

export const Shared: Record<string, INodeProperties> = {
	Tags: {
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		default: '["Tag"]',
		required: true,
		description:
			'Must match the regex /^[\\w\\-\\s:()äöüÄÖÜß\\/?]+$/. At most 255 characters.',
		routing: {
			send: {
				property: 'tags',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
};
