import { INodeProperties } from 'n8n-workflow';

export const ClaimShared: Record<string, INodeProperties> = {
	'Claim ID': {
		displayName: 'Claim ID',
		name: 'claimId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the claim',
	},
	Status: {
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 'offen',
		options: [
			{
				name: 'Offen',
				value: 'offen',
			},
			{
				name: 'Geschlossen',
				value: 'geschlossen',
			},
		],
		routing: {
			send: {
				property: 'status',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Custom Number': {
		displayName: 'Custom Number',
		name: 'customNumber',
		type: 'string',
		default: '',
		description: 'Value darf maximal 36 Zeichen haben',
		routing: {
			send: {
				property: 'customNumber',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	Comment: {
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		default: '',
		description: 'Value darf maximal 1000 Zeichen haben',
		routing: {
			send: {
				property: 'comment',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	'Claim Date': {
		displayName: 'Claim Date',
		name: 'claimDate',
		type: 'dateTime',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'claimDate',
				propertyInDotNotation: false,
				type: 'body',
				value:
					'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
			},
		},
	},
	'Notification Date': {
		displayName: 'Notification Date',
		name: 'notificationDate',
		type: 'dateTime',
		default: '',
		description: 'Value muss ein gültiges Datum sein',
		routing: {
			send: {
				property: 'notificationDate',
				propertyInDotNotation: false,
				type: 'body',
				value:
					'={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}',
			},
		},
	},
};
