import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NODE_DESCRIPTION } from '../base/node';
import * as doc from './openapi.json';
import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import QonektoOperationParser from '../openapi/QonektoOperationsParser';
import OpenApiDocConverter from '../openapi/OpenApiDocConverter';

const config: N8NPropertiesBuilderConfig = {
	operation: new QonektoOperationParser(),
};
const parser = new N8NPropertiesBuilder(OpenApiDocConverter(doc), config);
const properties = parser.build();

export class v20250926 implements INodeType {
	description: INodeTypeDescription = {
		...NODE_DESCRIPTION,
		version: 20250926,
		properties,
	};
}
