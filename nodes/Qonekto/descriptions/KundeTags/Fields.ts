import { INodeProperties } from 'n8n-workflow';

export const ListKundeTags: INodeProperties[] = [];

export const SetKundeTags: INodeProperties[] = [
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		default: '[\n  "jjuyjlbqswiwvcmy"\n]',
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
		displayOptions: {
			show: {
				resource: ['KundeTags'],
				operation: ['Set Kunde Tags'],
			},
		},
	},
];

export const AddKundeTags: INodeProperties[] = [
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		default: '[\n  "jjuyjlbqswiwvcmy"\n]',
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
		displayOptions: {
			show: {
				resource: ['KundeTags'],
				operation: ['Add Kunde Tags'],
			},
		},
	},
];

export const RemoveKundeTags: INodeProperties[] = [
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		default: '[\n  "jjuyjlbqswiwvcmy"\n]',
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
		displayOptions: {
			show: {
				resource: ['KundeTags'],
				operation: ['Remove Kunde Tags'],
			},
		},
	},
];

export default [...ListKundeTags, ...SetKundeTags, ...AddKundeTags, ...RemoveKundeTags];
