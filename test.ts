import doc from './nodes/Qonekto/openapi.json';
import OpenApiDocConverter from './nodes/Qonekto/openapi/OpenApiDocConverter';
import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import QonektoOperationParser from './nodes/Qonekto/openapi/QonektoOperationsParser';

console.log(doc);

const config: N8NPropertiesBuilderConfig = {
	operation: new QonektoOperationParser(),
};
const parser = new N8NPropertiesBuilder(OpenApiDocConverter(doc), config);
const properties = parser.build();

console.log(properties);
