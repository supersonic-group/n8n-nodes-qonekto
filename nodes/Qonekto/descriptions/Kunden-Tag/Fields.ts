import { INodeProperties } from 'n8n-workflow';

export const KundeTag: INodeProperties[] = [
	{
		displayName: 'Ameise Kundennummer',
		name: 'kunde_ameise_id',
		type: 'string',
		validateType: 'number',
		default: '',
		required: true,
		description: 'The ID of the Kunde in Ameise',
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
