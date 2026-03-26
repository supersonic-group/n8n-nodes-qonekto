import { INodeProperties } from 'n8n-workflow';
import { Shared as KundeShared } from '../Kunde/Shared';
import { Shared } from './Shared';

export const ListKundeTags: INodeProperties[] = [
	{
		...KundeShared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeTags'],
				operation: ['List Kunde Tags'],
			},
		},
	},
];

export const SetKundeTags: INodeProperties[] = [
	{
		...KundeShared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeTags'],
				operation: ['Set Kunde Tags'],
			},
		},
	},
	{
		...Shared['Tags'],
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
		...KundeShared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeTags'],
				operation: ['Add Kunde Tags'],
			},
		},
	},
	{
		...Shared['Tags'],
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
		...KundeShared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeTags'],
				operation: ['Remove Kunde Tags'],
			},
		},
	},
	{
		...Shared['Tags'],
		displayOptions: {
			show: {
				resource: ['KundeTags'],
				operation: ['Remove Kunde Tags'],
			},
		},
	},
];

export default [...ListKundeTags, ...SetKundeTags, ...AddKundeTags, ...RemoveKundeTags];
