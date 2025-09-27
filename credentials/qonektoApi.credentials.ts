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
			baseURL:
				'={{($env.QONEKTO_BASE_URL || "https://app.qonekto.de/api/") + $credentials.tenant}}',
			url: '/whoami',
		},
	};
}
