import { INodeProperties } from 'n8n-workflow';
import { Shared, SharedCollections } from './Shared';
import {
	GenericValue,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeParameterResourceLocator,
} from 'n8n-workflow/dist/esm/interfaces';
import { DATE_ONLY_VALUE } from '../Routing';
import { validateTimestampFilter } from './TimestampFilter';
import { returnAllField } from '../Pagination';

export const ListKunden: INodeProperties[] = [
	{
		displayName: 'Optional Search',
		name: 'optional search',
		type: 'collection',
		placeholder: 'Add Search Field',
		default: {},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				description:
					'Searches for all customers beginning with the keyword in `vorname` or `nachname`, or matching any `kommunikation` field. Cannot be combined with the filter parameter.',
				default: '',
				type: 'string',
				routing: {
					send: {
						type: 'query',
						property: 'search',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['List Kunden'],
			},
		},
	},
	returnAllField('Kunde', 'List Kunden'),
	{
		displayName: 'Pagination Fields',
		name: 'pagination fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Per Page',
				name: 'per_page',
				description: 'Changes per_page used for pagination from default 25 to max 100',
				default: 50,
				type: 'number',
				routing: {
					send: {
						type: 'query',
						property: 'per_page',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				description: 'Returns result of given page number',
				default: 1,
				type: 'number',
				routing: {
					send: {
						type: 'query',
						property: 'page',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['List Kunden'],
			},
		},
	},
];

export const CreateKunde: INodeProperties[] = [
	{
		...Shared['Anrede ID'],
		required: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'vorname',
		type: 'string',
		default: '',
		required: true,
		description:
			'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the contact person. At most 255 characters.',
		routing: {
			send: {
				property: 'vorname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'nachname',
		type: 'string',
		default: '',
		required: true,
		description:
			'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the company name. At most 255 characters.',
		routing: {
			send: {
				property: 'nachname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		...Shared['Land ID'],
		required: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		...SharedCollections['Kunde Optional Fields'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
	{
		...SharedCollections['Kunde Notification Settings'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create Kunde'],
			},
		},
	},
];

export const FilterKunden: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		options: [
			{
				displayName: 'Address Informally (Du)',
				name: 'per_du',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						property: 'per_du',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Ameise ID',
				name: 'ameise_id',
				type: 'number',
				default: '',
				description: 'Filter by Ameise ID',
				routing: {
					send: {
						property: 'ameise_id',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				...Shared['Vermittler ID'],
			},
			{
				displayName: 'Broker Mandate Created At',
				name: 'maklervollmacht_created_at',
				type: 'dateTime',
				default: '',
				description:
					'Matches customers whose broker mandate was created on this date, over the whole day in German time (Europe/Berlin). The time of day is ignored.',
				routing: {
					send: {
						property: 'maklervollmacht_created_at',
						propertyInDotNotation: false,
						type: 'body',
						value: DATE_ONLY_VALUE,
					},
				},
				displayOptions: {
					show: {
						'@version': [{ _cnd: { lt: 20260925 } }],
					},
				},
			},
			{
				displayName: 'Broker Mandate Created At',
				name: 'maklervollmacht_created_at',
				type: 'string',
				default: '',
				placeholder: 'e.g. 2024-05-01',
				description:
					'Matches customers whose broker mandate was created in this period, read in German time (Europe/Berlin): a year (2024), month (2024-05) or date (2024-05-01) matches all of it, an ISO 8601 time (2024-05-01T10:00:00+02:00) matches to the second',
				routing: {
					send: {
						property: 'maklervollmacht_created_at',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
						preSend: [validateTimestampFilter('maklervollmacht_created_at')],
					},
				},
				displayOptions: {
					show: {
						'@version': [{ _cnd: { gte: 20260925 } }],
					},
				},
			},
			{
				displayName: 'City',
				name: 'ort',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'ort',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Communication',
				name: 'kommunikation',
				type: 'json',
				default: 'null',
				routing: {
					send: {
						property: 'kommunikation',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				...Shared['Land ID'],
			},
			{
				displayName: 'Date of Birth',
				name: 'geburtsdatum',
				type: 'dateTime',
				default: '',
				description: 'Must be a valid date in the format <code>Y-m-d,d.m.Y</code>',
				routing: {
					send: {
						property: 'geburtsdatum',
						propertyInDotNotation: false,
						type: 'body',
						value: DATE_ONLY_VALUE,
					},
				},
			},
			{
				displayName: 'Deceased',
				name: 'verstorben',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						property: 'verstorben',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Details',
				name: 'details',
				type: 'json',
				default: 'null',
				routing: {
					send: {
						property: 'details',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'vorname',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'vorname',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Last Name',
				name: 'nachname',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'nachname',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Last Simplr Login At',
				name: 'last_simplr_login_at',
				type: 'dateTime',
				default: '',
				description:
					'Matches customers whose last Simplr login was on this date, over the whole day in German time (Europe/Berlin). The time of day is ignored.',
				routing: {
					send: {
						property: 'last_simplr_login_at',
						propertyInDotNotation: false,
						type: 'body',
						value: DATE_ONLY_VALUE,
					},
				},
				displayOptions: {
					show: {
						'@version': [{ _cnd: { lt: 20260925 } }],
					},
				},
			},
			{
				displayName: 'Last Simplr Login At',
				name: 'last_simplr_login_at',
				type: 'string',
				default: '',
				placeholder: 'e.g. 2024-05-01',
				description:
					'Matches customers whose last Simplr login falls in this period, read in German time (Europe/Berlin): a year (2024), month (2024-05) or date (2024-05-01) matches all of it, an ISO 8601 time (2024-05-01T10:00:00+02:00) matches to the second',
				routing: {
					send: {
						property: 'last_simplr_login_at',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
						preSend: [validateTimestampFilter('last_simplr_login_at')],
					},
				},
				displayOptions: {
					show: {
						'@version': [{ _cnd: { gte: 20260925 } }],
					},
				},
			},
			{
				...Shared['Rechtsform ID'],
			},
			{
				displayName: 'Nationality',
				name: 'nationalitaet',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'nationalitaet',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Occupation',
				name: 'beruf',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'beruf',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Postal Code',
				name: 'plz',
				type: 'string',
				default: '',
				description: 'For German addresses 4 or 5 digits. Other countries allow up to 10 characters of letters, digits, spaces and hyphens.',
				routing: {
					send: {
						property: 'plz',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				...Shared['Anrede ID'],
			},
			{
				displayName: 'Simplr Username',
				name: 'benutzername_simplr',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'benutzername_simplr',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Street',
				name: 'strasse',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'strasse',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'titel',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'titel',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Filter Kunden'],
			},
		},
	},
	{
		displayName: 'Pagination Fields',
		name: 'pagination fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Skip',
				name: '_skip',
				type: 'number',
				default: 0,
				description: 'How many items to skip in results',
				routing: {
					send: {
						property: '_skip',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Limit',
				name: '_limit',
				type: 'number',
				default: 25,
				description: 'How many items to return in results',
				hint: 'Max: 100',
				routing: {
					send: {
						property: '_limit',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Filter Kunden'],
			},
		},
	},
];

const KundeFields: INodeProperties[] = [
	{
		...Shared['Vermittler ID'],
	},
	{
		...Shared['Anrede ID'],
	},
	{
		displayName: 'First Name',
		name: 'vorname',
		type: 'string',
		default: '',
		description:
			'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the contact person. At most 255 characters.',
		routing: {
			send: {
				property: 'vorname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'nachname',
		type: 'string',
		default: '',
		description:
			'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the company name. At most 255 characters.',
		routing: {
			send: {
				property: 'nachname',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Title',
		name: 'titel',
		type: 'string',
		default: '',
		description:
			'Not used if the salutation (anrede_id) is a legal entity (juristische_person = true). At most 255 characters.',
		routing: {
			send: {
				property: 'titel',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Street',
		name: 'strasse',
		type: 'string',
		default: '',
		description: 'At most 255 characters',
		routing: {
			send: {
				property: 'strasse',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Postal Code',
		name: 'plz',
		type: 'string',
		default: '',
		description: 'For German addresses 4 or 5 digits. Other countries allow up to 10 characters of letters, digits, spaces and hyphens.',
		routing: {
			send: {
				property: 'plz',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'City',
		name: 'ort',
		type: 'string',
		default: '',
		description: 'At most 255 characters',
		routing: {
			send: {
				property: 'ort',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		...Shared['Land ID'],
	},
	{
		displayName: 'Date of Birth',
		name: 'geburtsdatum',
		type: 'string',
		default: '',
		description:
			'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the founding date. Must be a valid date in the format <code>Y-m-d,d.m.Y</code>.',
		routing: {
			send: {
				property: 'geburtsdatum',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Occupation',
		name: 'beruf',
		type: 'string',
		default: '',
		description:
			'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the industry. At most 255 characters.',
		routing: {
			send: {
				property: 'beruf',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Address Informally (Du)',
		name: 'per_du',
		type: 'boolean',
		default: false,
		description: 'Whether to pass this to Ameise; currently not passed',
		routing: {
			send: {
				property: 'per_du',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Nationality',
		name: 'nationalitaet',
		type: 'string',
		default: '',
		description:
			'Currently not passed to Ameise. At most 255 characters.',
		routing: {
			send: {
				property: 'nationalitaet',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		...Shared['Rechtsform ID'],
	},
	{
		displayName: 'Simplr Username',
		name: 'benutzername_simplr',
		type: 'string',
		default: '',
		description: 'At most 255 characters',
		routing: {
			send: {
				property: 'benutzername_simplr',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Deceased',
		name: 'verstorben',
		type: 'boolean',
		default: false,
		description: 'Whether to mark the customer as deceased; currently not passed to Ameise',
		routing: {
			send: {
				property: 'verstorben',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Communication',
		name: 'kommunikation',
		type: 'json',
		default: '{\n  "email": "info@muster.test",\n  "website": "https://url.test"\n}',
		description: 'All default communication data for this customer',
		routing: {
			send: {
				property: 'kommunikation',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
	{
		displayName: 'Details',
		name: 'details',
		type: 'json',
		default:
			'{\n  "feld_1_float": 12.2,\n  "feld_2_int": 3,\n  "feld_3_text": "test",\n  "feld_4_bool": false,\n  "feld_5_date": "2024-01-23"\n}',
		description: 'Customer details as an object keyed by field ID, with the corresponding value',
		routing: {
			send: {
				property: 'details',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ JSON.parse($value) }}',
			},
		},
	},
];

const makeKundeFieldsPresendAction = (nodeParameter: string, bodyParameter: string | null) => {
	return async function (
		this: IExecuteSingleFunctions,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const fields = this.getNodeParameter(nodeParameter) as Record<
			string,
			GenericValue | INodeParameterResourceLocator
		>;
		for (const field of Object.keys(fields)) {
			if (fields[field] && typeof fields[field] === 'object' && 'value' in fields[field]) {
				fields[field] = fields[field].value;
			} else if (
				fields[field] &&
				typeof fields[field] === 'string' &&
				['kommunikation', 'details'].includes(field)
			) {
				fields[field] = JSON.parse(fields[field]);
			}
			if (bodyParameter === null) {
				// @ts-expect-error - Property 'body' does not exist on type 'IHttpRequestOptions'.
				requestOptions.body[field] = fields[field];
			}
		}
		if (bodyParameter !== null) {
			// @ts-expect-error - Property 'body' does not exist on type 'IHttpRequestOptions'.
			requestOptions.body[bodyParameter] = fields;
		}
		return requestOptions;
	};
};

export const UpsertKunde: INodeProperties[] = [
	{
		displayName: 'Fields to Set on Customer (Existing or New)',
		name: 'kunde fields',
		type: 'collection',
		placeholder: 'Add Field',
		required: true,
		default: {},
		options: KundeFields.slice(0).map((item) => {
			item.routing = undefined;
			delete item.routing;
			return item;
		}),
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
		routing: {
			send: {
				preSend: [makeKundeFieldsPresendAction('kunde fields', null)],
			},
		},
	},
	{
		...SharedCollections['Kunde Notification Settings'],
		description: 'Notification Settings (Only for Newly Created Customer)',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
	{
		displayName: 'Fields to Use to Search for Existing Customer',
		name: '_search',
		type: 'multiOptions',
		default: ['vorname', 'nachname', 'kommunikation.email_any'],
		required: true,
		description:
			'Parameter names which should be used to search for existing customer. Allows kommunikation.email_**any** to match any kontext (private, business). Furthermore customer may have the kommunikation.* property not as the default kommunikation value.',
		options: [
			...KundeFields.filter((item) => item.type !== 'json').map((item) => {
				return {
					name: item.displayName,
					value: item.name,
				};
			}),
			...['email', 'telefon', 'mobil', 'website', 'fax'].flatMap((art) =>
				['any', 'private', 'business'].map((kontext) => ({
					name:
						'Kommunikation: ' +
						{
							any: 'Any',
							private: 'Private',
							business: 'Business',
						}[kontext] +
						' ' +
						{
							email: 'E-Mail',
							telefon: 'Telefon',
							mobil: 'Mobil',
							website: 'Website',
							fax: 'Fax',
						}[art],
					value: `kommunikation.${art}_${kontext}`,
				})),
			),
		],
		routing: {
			send: {
				property: '_search',
				propertyInDotNotation: false,
				type: 'body',
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
	},
	{
		displayName: 'Customer Fields to Set Only for Newly Created Customer',
		name: '_default',
		type: 'collection',
		description:
			'Parameters that will only be set for a newly created customer and not already set. If a customer is found, the values of the fields in this collection will not be used.',
		default: {},
		options: KundeFields.slice(0).map((item) => {
			item.routing = undefined;
			delete item.routing;
			return item;
		}),
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upsert Kunde'],
			},
		},
		routing: {
			send: {
				preSend: [makeKundeFieldsPresendAction('_default', '_default')],
			},
		},
	},
];

export const ShowKunde: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Show Kunde'],
			},
		},
	},
	{
		displayName: 'With Communications',
		name: 'with-kommunikationen',
		description: 'Whether to load and return communications and default fields for the customer',
		default: true,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'with-kommunikationen',
				value: '={{ $value }}',
				propertyInDotNotation: false,
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Show Kunde'],
			},
		},
	},
	{
		displayName: 'With Details',
		name: 'with-details',
		description: 'Whether to load and return details for the customer',
		default: true,
		type: 'boolean',
		routing: {
			send: {
				type: 'query',
				property: 'with-details',
				value: '={{ $value }}',
				propertyInDotNotation: false,
			},
		},
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Show Kunde'],
			},
		},
	},
];

export const UpdateKunde: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Update Kunde'],
			},
		},
	},
	{
		displayName: 'Optional Fields',
		name: 'optional fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Address Informally (Du)',
				name: 'per_du',
				type: 'boolean',
				default: false,
				description: 'Whether to pass this to Ameise; currently not passed',
				routing: {
					send: {
						property: 'per_du',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				...Shared['Vermittler ID'],
			},
			{
				displayName: 'City',
				name: 'ort',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'ort',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Communication',
				name: 'kommunikation',
				type: 'json',
				default: '{\n  "email": "info@muster.test",\n  "website": "https://url.test"\n}',
				description: 'All default communication data for this customer',
				routing: {
					send: {
						property: 'kommunikation',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				...Shared['Land ID'],
			},
			{
				displayName: 'Date of Birth',
				name: 'geburtsdatum',
				type: 'dateTime',
				default: '',
				description:
					'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the founding date. Must be a valid date in the format <code>Y-m-d,d.m.Y</code>.',
				routing: {
					send: {
						property: 'geburtsdatum',
						propertyInDotNotation: false,
						type: 'body',
						value: DATE_ONLY_VALUE,
					},
				},
			},
			{
				displayName: 'Deceased',
				name: 'verstorben',
				type: 'boolean',
				default: false,
				description: 'Whether to mark the customer as deceased; currently not passed to Ameise',
				routing: {
					send: {
						property: 'verstorben',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Details',
				name: 'details',
				type: 'json',
				default:
					'{\n  "feld_1_float": 12.2,\n  "feld_2_int": 3,\n  "feld_3_text": "test",\n  "feld_4_bool": false,\n  "feld_5_date": "2024-01-23"\n}',
				description: 'Customer details as an object keyed by field ID, with the corresponding value',
				routing: {
					send: {
						property: 'details',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'vorname',
				type: 'string',
				default: '',
				description:
					'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the contact person. At most 255 characters.',
				routing: {
					send: {
						property: 'vorname',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Last Name',
				name: 'nachname',
				type: 'string',
				default: '',
				description:
					'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the company name. At most 255 characters.',
				routing: {
					send: {
						property: 'nachname',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				...Shared['Rechtsform ID'],
			},
			{
				displayName: 'Nationality',
				name: 'nationalitaet',
				type: 'string',
				default: '',
				description:
					'Currently not passed to Ameise. At most 255 characters.',
				routing: {
					send: {
						property: 'nationalitaet',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Occupation',
				name: 'beruf',
				type: 'string',
				default: '',
				description:
					'If the salutation (anrede_id) is a legal entity (juristische_person = true), this field holds the industry. At most 255 characters.',
				routing: {
					send: {
						property: 'beruf',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Postal Code',
				name: 'plz',
				type: 'string',
				default: '',
				description: 'For German addresses 4 or 5 digits. Other countries allow up to 10 characters of letters, digits, spaces and hyphens.',
				routing: {
					send: {
						property: 'plz',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				...Shared['Anrede ID'],
			},
			{
				displayName: 'Simplr Username',
				name: 'benutzername_simplr',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'benutzername_simplr',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Street',
				name: 'strasse',
				type: 'string',
				default: '',
				description: 'At most 255 characters',
				routing: {
					send: {
						property: 'strasse',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'titel',
				type: 'string',
				default: '',
				description:
					'Not used if the salutation (anrede_id) is a legal entity (juristische_person = true). At most 255 characters.',
				routing: {
					send: {
						property: 'titel',
						propertyInDotNotation: false,
						type: 'body',
						value: '={{ $value }}',
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Update Kunde'],
			},
		},
	},
];

export const ListArchiveEntries: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['List Archive Entries'],
			},
		},
	},
	{
		displayName: 'Optional Fields',
		name: 'optional fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: '',
				placeholder: 'typ,datum,betreff,download_url',
				description:
					'Comma-separated list of fields to return. Omit to return every field.',
				routing: {
					send: {
						type: 'query',
						property: 'fields',
						value: '={{ $value }}',
						propertyInDotNotation: false,
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['List Archive Entries'],
			},
		},
	},
];

export const UploadFile: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		displayName: 'File',
		name: 'file',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the binary property to upload as file',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'betreff',
		type: 'string',
		default: '',
		description: 'If empty, will use the original filename from the binary property',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
	{
		...SharedCollections['File Optional Fields'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Upload File'],
			},
		},
	},
];

export const CreateFile: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
	},
	{
		displayName: 'Type',
		name: 'typ',
		type: 'options',
		default: 'sonstiges',
		options: [
			{ name: 'Chat', value: 'chat' },
			{ name: 'Email', value: 'email' },
			{ name: 'Fax', value: 'fax' },
			{ name: 'In Person', value: 'persoenlich' },
			{ name: 'Letter', value: 'brief' },
			{ name: 'Other', value: 'sonstiges' },
			{ name: 'Phone', value: 'telefon' },
			{ name: 'SMS', value: 'sms' },
		],
		required: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'typ',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'betreff',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'betreff',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		description: 'Text content of the entry',
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
		routing: {
			send: {
				property: 'content',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
	},
	{
		...SharedCollections['File Optional Fields'],
		displayOptions: {
			show: {
				resource: ['Kunde'],
				operation: ['Create File'],
			},
		},
	},
];

export default [
	...ListKunden,
	...CreateKunde,
	...FilterKunden,
	...UpsertKunde,
	...ShowKunde,
	...UpdateKunde,
	...ListArchiveEntries,
	...UploadFile,
	...CreateFile,
];
