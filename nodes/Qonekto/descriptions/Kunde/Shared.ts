import { INodeProperties } from 'n8n-workflow';

export const Shared: Record<string, INodeProperties> = {
	'Kunde Ameise ID': {
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
	},
	'Anrede ID': {
		displayName: 'Anrede Name or ID',
		name: 'anrede_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select an Anrede',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getAnreden',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
		],
		routing: {
			send: {
				property: 'anrede_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Vermittler ID': {
		displayName: 'Vermittler Name or ID',
		name: 'vermittler_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a Vermittler',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getVermittler',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '^[0-9A-Za-z]{6}$',
							errorMessage: 'The ID must be alpanumeric and 6 characters long',
						},
					},
				],
			},
		],
		routing: {
			send: {
				property: 'vermittler_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Land ID': {
		displayName: 'Land Name or ID',
		name: 'land_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a Land',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getLaender',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
		],
		routing: {
			send: {
				property: 'land_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Rechtsform ID': {
		displayName: 'Rechtsform Name or ID',
		name: 'rechtsform_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a Rechtsform (required if Anrede is a juristic person)',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getRechtsformen',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
		],
		routing: {
			send: {
				property: 'rechtsform_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Sparte ID': {
		displayName: 'Sparte Name or ID',
		name: 'sparte_id',
		type: 'resourceLocator',
		default: '',
		description: 'Select a Sparte',
		modes: [
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'getSparten',
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
			},
		],
	},
};
