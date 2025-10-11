import { INodeProperties } from 'n8n-workflow';

export const KundeTag: INodeProperties[] = [
	{
		displayName: 'Ameise Kundennummer',
		name: 'kunde_ameise_id',
		type: 'resourceLocator',
		default: '',
		required: true,
		description: 'The ID of the Kunde in Ameise',
		modes: [
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '^[0-9]+$',
							errorMessage: 'Must be a number',
						},
					},
				],
			},
			{
				displayName: 'Search',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'searchKunden',
					searchable: true,
					searchFilterRequired: true,
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Kunden-Tag'],
			},
		},
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		default: '["Tag"]',
		displayOptions: {
			show: {
				resource: ['Kunden-Tag'],
				operation: ['Set Kunde Tags', 'Add Kunde Tags', 'Remove Kunde Tags'],
			},
		},
		routing: {
			send: {
				property: 'tags',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
];

export default KundeTag;
