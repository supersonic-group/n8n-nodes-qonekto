import { INodeProperties } from 'n8n-workflow';

export const Shared: Record<string, INodeProperties> = {
	'Kunde Ameise ID': {
		displayName: 'Ameise Kundennummer',
		name: 'kunde_ameise_id',
		type: 'string',
		validateType: 'number',
		default: '',
		required: true,
		description: 'The ID of the Kunde in Ameise',
	},
	'Anrede ID': {
		displayName: 'Anrede Name or ID',
		name: 'anrede_id',
		type: 'options',
		default: '',
		description:
			'The ID for the anrede of the object. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		routing: {
			send: {
				property: 'anrede_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getAnreden',
		},
	},
	'Vermittler ID': {
		displayName: 'Vermittler Name or ID',
		name: 'vermittler_id',
		type: 'options',
		default: '',
		description:
			'The ID for the vermittler of the object. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		routing: {
			send: {
				property: 'vermittler_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getVermittler',
		},
	},
	'Land ID': {
		displayName: 'Land Name or ID',
		name: 'land_id',
		type: 'options',
		default: '',
		description:
			'The ID for the country of the object. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		routing: {
			send: {
				property: 'land_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getLaender',
		},
	},
	'Rechtsform ID': {
		displayName: 'Rechtsform Name or ID',
		name: 'rechtsform_id',
		type: 'options',
		default: '',
		description:
			'Wird aktuell nicht an die Ameise übergeben. Benötigt wenn anrede_id zu einer Anrede gehört, wo juristische_person = true ist. The ID for the rechtsform of the object. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		routing: {
			send: {
				property: 'rechtsform_id',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getRechtsformen',
		},
	},
	'Sparte ID': {
		displayName: 'Sparte Name or ID',
		name: 'sparte_id',
		type: 'options',
		default: '',
		description:
			'The ID for the sparte of the object. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getSparten',
		},
	},
};
