import {
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { qonektoApiRequest, qonektoApiRequestFull } from './GenericFunctions';

export class QonektoTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qonekto Trigger',
		name: 'qonektoTrigger',
		group: ['trigger'],
		description:
			'Starts the workflow when a Qonekto event for the given action and the given subject type occurs',

		icon: 'file:qonekto.svg',

		inputs: [],
		outputs: [NodeConnectionTypes.Main],

		credentials: [
			{
				name: 'qonektoApi',
				required: true,
				displayOptions: { show: { authentication: ['accessToken'] } },
			},
			{
				name: 'qonektoOAuth2Api',
				required: true,
				displayOptions: { show: { authentication: ['oAuth2'] } },
			},
		],
		subtitle:
			'={{$credentials.tenant + ": " + $parameter["action"] + " " + $parameter["subject_type"]}}',
		defaults: {
			name: 'Qonekto Trigger',
		},

		version: 20250926,

		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],

		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				default: 'accessToken',
				options: [
					{ name: 'API Token', value: 'accessToken' },
					{ name: 'OAuth2', value: 'oAuth2' },
				],
			},
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				options: [
					{ name: 'Created', value: 'created' },
					{ name: 'Updated', value: 'updated' },
					{ name: 'Deleted', value: 'deleted' },
					{ name: 'Archive Entry Created', value: 'api-create-archive' },
				],
				required: true,
				default: 'created',
				description:
					'The action to listen to. Not every subject type supports every action: "Deleted" is available for Customer, Contract, Customer Detail and Customer Communication, and "Archive Entry Created" for Customer only. Every other subject type supports "Created" and "Updated" alone. An unsupported pair is rejected when the trigger is activated.',
			},
			{
				displayName: 'Subject Type',
				name: 'subject_type',
				type: 'options',
				options: [
					{ name: 'Broker', value: 'ameise.vermittler' },
					{ name: 'Contract', value: 'ameise.vertrag' },
					{ name: 'Country', value: 'ameise.land' },
					{ name: 'Customer', value: 'ameise.kunde' },
					{ name: 'Customer Communication', value: 'ameise.kundenkommunikation' },
					{ name: 'Customer Detail', value: 'ameise.kundendetail' },
					{ name: 'Customer Detail Field', value: 'ameise.kundendetailfeld' },
					{ name: 'Division', value: 'ameise.sparte' },
					{ name: 'Insurer', value: 'ameise.gesellschaft' },
					{ name: 'Legal Form', value: 'ameise.rechtsform' },
					{ name: 'Payment Method', value: 'ameise.zahlweise' },
					{ name: 'Salutation', value: 'ameise.anrede' },
					{ name: 'Status', value: 'ameise.status' },
				],
				required: true,
				default: 'ameise.anrede',
				description: 'The subject type to listen to',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId === undefined || webhookData.webhookToken === undefined) {
					// No webhook id is set so no webhook can exist
					return false;
				}

				try {
					await qonektoApiRequest.call(
						this,
						'webhook/managed/status',
						'POST',
						{},
						{
							id: webhookData.webhookId,
							token: webhookData.webhookToken,
						},
					);
				} catch (error) {
					// qonektoApiRequest wraps failures in NodeApiError, which carries httpCode
					// at the top level; `cause` is often undefined, so reading it first threw a
					// TypeError before the 404 check ever ran and left the workflow unable to
					// re-activate once its webhook had gone missing server-side.
					const httpCode = String(error?.httpCode ?? error?.cause?.httpCode ?? '');
					const description = String(error?.description ?? '');

					if (httpCode === '404' || description.includes('404')) {
						// Webhook does not exist
						delete webhookData.webhookId;
						delete webhookData.webhookToken;

						return false;
					}

					// Some error occured. Already a NodeApiError, which the constructor returns as-is.
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}

				// If it did not error then the webhook exists
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');

				const action = this.getNodeParameter('action') as string;
				const subject_type = this.getNodeParameter('subject_type') as string;

				const body = {
					url: webhookUrl,
					action,
					subject_type,
				};

				let responseData: JsonObject;
				try {
					responseData = (await qonektoApiRequest.call(
						this,
						'webhook/managed',
						'POST',
						{},
						body,
					)) as JsonObject;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}

				if (responseData.id === undefined || responseData.token === undefined) {
					// Required data is missing so was not successful
					throw new NodeApiError(this.getNode(), responseData as JsonObject, {
						message: 'Qonekto webhook creation response did not contain the expected data.',
					});
				}

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = responseData.id as string;
				webhookData.webhookToken = responseData.token as string;

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined && webhookData.webhookToken !== undefined) {
					const body = {
						id: webhookData.webhookId,
						token: webhookData.webhookToken,
					};

					let response;
					try {
						response = await qonektoApiRequestFull.call(
							this,
							'webhook/managed',
							'DELETE',
							{},
							body,
						);
					} catch (error) {
						this.logger.warn('Qonekto webhook could not be deleted', { error });
						return false;
					}
					if (response.statusCode !== 200) {
						return false;
					}

					// Remove from the static workflow data so that it is clear
					// that no webhooks are registered anymore
					delete webhookData.webhookId;
					delete webhookData.webhookToken;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		return {
			workflowData: [this.helpers.returnJsonArray([this.getBodyData()])],
		};
	}
}
