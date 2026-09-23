import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

// n8n registers a public PKCE client on every connect and discovers endpoints, scopes and the
// RFC 8707 `resource` from serverUrl, the tenant's API URL. A new client stays pending until
// Qonekto support approves it (mvp-connector ADR 0058).
export class qonektoOAuth2Api implements ICredentialType {
	name = 'qonektoOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Qonekto OAuth2 API';

	icon: Icon = 'file:qonekto.svg';

	documentationUrl =
		'https://github.com/supersonic-group/n8n-nodes-qonekto?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Use Dynamic Client Registration',
			name: 'useDynamicClientRegistration',
			type: 'hidden',
			default: true,
		},
		{
			displayName: 'Tenant',
			name: 'tenant',
			type: 'string',
			required: true,
			default: '',
			validateType: 'string-alphanumeric',
		},
		{
			displayName: 'Base URL',
			name: 'base_url',
			type: 'options',
			required: true,
			default: 'https://app.qonekto.de/api/',
			validateType: 'url',
			options: [
				{
					name: 'Production',
					value: 'https://app.qonekto.de/api/',
				},
			],
		},
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'hidden',
			default: '={{$self["base_url"] + $self["tenant"]}}',
		},
	];
}
