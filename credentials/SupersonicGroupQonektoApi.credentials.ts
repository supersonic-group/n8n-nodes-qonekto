import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SupersonicGroupQonektoApi implements ICredentialType {
	name = 'supersonicGroupQonektoApi';

	displayName = 'Supersonic Group Qonekto API';

	// Link to your community node's README
	documentationUrl = 'https://github.com/org/@supersonic-group/-qonekto?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
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
			baseURL: 'https://app.qonekto.de/api',
			url: '/v1/user',
		},
	};
}
