import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';
import doc from './openapi.json';
import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import QonektoOperationParser from './openapi/QonektoOperationsParser';
import OpenApiDocConverter from './openapi/OpenApiDocConverter';
import { OpenAPIV3 } from 'openapi-types';

const config: N8NPropertiesBuilderConfig = {
	operation: new QonektoOperationParser(),
};
const parser = new N8NPropertiesBuilder(OpenApiDocConverter(doc as OpenAPIV3.Document), config);
const properties = parser.build();

export class Qonekto implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qonekto',
		name: 'qonekto',
		group: ['transform'],
		description: 'Interact with the Qonekto API',

		icon: { light: 'file:qonekto.svg', dark: 'file:qonekto.dark.svg' },

		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],

		credentials: [{ name: 'qonektoApi', required: true }],
		subtitle:
			'={{$parameter["operation"] + ": /api/" + $credentials.tenant + "/" + $parameter["resource"]}}',
		defaults: {
			name: '={{"Qonekto (" + $credentials.tenant + ")"}}',
		},
		requestDefaults: {
			baseURL: '={{"https://app.qonekto.de/api/" + $credentials.tenant}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		version: 20250926,

		properties,
	};
}
