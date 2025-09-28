import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class qonektoApi implements ICredentialType {
	name = 'qonektoApi';

	displayName = 'Qonekto API';

	icon: Icon = 'file:qonekto.svg';

	// Link to your community node's README
	documentationUrl =
		'https://github.com/supersonic-group/n8n-nodes-qonekto?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
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
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.base_url + $credentials.tenant}}',
			url: '/whoami',
		},
	};
}
