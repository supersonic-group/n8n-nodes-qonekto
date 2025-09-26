import { type INodeType, type INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';
import {
	DefaultOperationParser,
	N8NPropertiesBuilder,
	N8NPropertiesBuilderConfig,
	OperationContext,
} from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
import * as doc from './openapi.json';

const paths: OpenAPIV3.PathsObject = {};
const trimRegex = /^\/api\/\{tenant}\//;
Object.keys(doc.paths).forEach((path) => {
	paths[path.replace(trimRegex, '/')] = (doc.paths as OpenAPIV3.PathsObject)[path];
});

class CustomOperationParser extends DefaultOperationParser {
	name(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
		if (operation.operationId === 'lnder') {
			return 'Länder';
		}
		return super.name(operation, context);
	}

	shouldSkip(operation: OpenAPIV3.OperationObject, context: OperationContext): boolean {
		if (
			operation.operationId === 'addArchiveintrag' ||
			operation.operationId === 'triggerPipelineImportFromCRM'
		) {
			return true;
		}

		return super.shouldSkip(operation, context);
	}
}

const config: N8NPropertiesBuilderConfig = {
	operation: new CustomOperationParser(),
};
const parser = new N8NPropertiesBuilder(
	{
		...doc,
		paths,
	},
	config,
);
const properties = parser.build();

export class Qonekto implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qonekto',
		name: 'qonekto',
		icon: { light: 'file:qonekto.svg', dark: 'file:qonekto.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle:
			'={{$parameter["operation"] + ": /api/" + $credentials.tenant + "/" + $parameter["resource"]}}',
		description: 'Interact with the Qonekto API',
		defaults: {
			name: '={{"Qonekto (" + $credentials.tenant + ")"}}',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'qonektoApi', required: true }],
		requestDefaults: {
			baseURL: '={{"https://app.qonekto.de/api/" + $credentials.tenant}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: properties,
	};
}
