import { INodeProperties } from 'n8n-workflow';
import { Shared } from '../Kunde/Shared';

export const SendCustomerNotification: INodeProperties[] = [
	{
		...Shared['Kunde Ameise ID'],
		displayOptions: {
			show: {
				resource: ['KundeNotifications'],
				operation: ['Send Customer Notification'],
			},
		},
	},
	{
		displayName: 'Notification Type',
		required: true,
		name: 'notificationType',
		type: 'options',
		default: 'password-reset-data',
		options: [
			{
				name: 'Login Data',
				value: 'login-data',
			},
			{
				name: 'Password Reset Data',
				value: 'password-reset-data',
			},
			{
				name: 'Initial Info',
				value: 'initial-info',
			},
		],
		routing: {
			send: {
				property: 'notificationType',
				propertyInDotNotation: false,
				type: 'body',
				value: '={{ $value }}',
			},
		},
		displayOptions: {
			show: {
				resource: ['KundeNotifications'],
				operation: ['Send Customer Notification'],
			},
		},
	},
];

export default SendCustomerNotification;
