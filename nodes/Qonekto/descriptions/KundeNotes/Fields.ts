import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';
import { KundeNotesShared } from './Shared';

export const ListCustomerNotes: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['List Customer Notes'],
			},
		},
	},
];

export const AddCustomerNote: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Add Customer Note'],
			},
		},
	},
	{
		...KundeNotesShared['Type'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Add Customer Note'],
			},
		},
	},
	{
		...KundeNotesShared['Text'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Add Customer Note'],
			},
		},
	},
];

export const EditCustomerNote: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Edit Customer Note'],
			},
		},
	},
	{
		...KundeNotesShared['Note ID'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Edit Customer Note'],
			},
		},
	},
	{
		...KundeNotesShared['Type'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Edit Customer Note'],
			},
		},
	},
	{
		...KundeNotesShared['Text'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Edit Customer Note'],
			},
		},
	},
];

export const DeleteCustomerNote: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Delete Customer Note'],
			},
		},
	},
	{
		...KundeNotesShared['Note ID'],
		displayOptions: {
			show: {
				resource: ['KundeNotes'],
				operation: ['Delete Customer Note'],
			},
		},
	},
];

export default [
	...ListCustomerNotes,
	...AddCustomerNote,
	...EditCustomerNote,
	...DeleteCustomerNote,
];
