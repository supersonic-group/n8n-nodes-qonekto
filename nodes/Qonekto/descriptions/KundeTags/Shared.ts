import { INodeProperties } from 'n8n-workflow';

export const Shared: Record<string, INodeProperties> = {
	Tags: {
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		default: '["Tag"]',
		description:
			'Must match the regex /^[\\w\\-\\s:()äöüÄÖÜß\\/?]+$/. value darf maximal 255 Zeichen haben.',
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
