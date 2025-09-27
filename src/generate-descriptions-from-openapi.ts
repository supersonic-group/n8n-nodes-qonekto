// eslint-disable-file
import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import QonektoOperationParser from './openapi/QonektoOperationsParser';
import OpenApiDocConverter from './openapi/OpenApiDocConverter';
import { OpenAPIV3 } from 'openapi-types';
import { INodeProperties } from 'n8n-workflow';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { exit } from 'node:process';

const [docPath, basePath] = process.argv.slice(2);
if (!docPath || !basePath) {
	console.error('usage: node generate-descriptions-from-openapi.js <docPath> <basePath>');
	exit(1);
}
if (!existsSync(docPath) || !statSync(docPath).isFile()) {
	console.error('docPath must be a file');
	exit(2);
}
if (!existsSync(basePath) || !statSync(basePath).isDirectory()) {
	console.error('basePath must be a directory');
	exit(3);
}

let doc: OpenAPIV3.Document;
try {
	doc = JSON.parse(readFileSync(docPath, 'utf-8'));
} catch (e) {
	console.error('docPath must be a valid JSON file', e);
	exit(4);
}

const config: N8NPropertiesBuilderConfig = {
	operation: new QonektoOperationParser(),
};
const parser = new N8NPropertiesBuilder(OpenApiDocConverter(doc), config);
const properties = parser.build();

const makeFile = (exports: Record<string, INodeProperties[]>, textTop: string = ''): string => {
	return (
		"import { INodeProperties } from 'n8n-workflow';\n" +
		'\n' +
		textTop +
		Object.keys(exports)
			.map((key) => {
				return (
					`export const ${key}: INodeProperties[] = ` +
					JSON.stringify(exports[key], null, 2) +
					';\n'
				);
			})
			.join('\n') +
		'\n' +
		(Object.keys(exports).length === 1
			? 'export default ' + Object.keys(exports)[0] + ';\n'
			: 'export default [\n' +
				Object.keys(exports)
					.map((key) => '\t...' + key)
					.join(',\n') +
				',\n]\n')
	);
};

const resourceOperations: Record<string, INodeProperties[]> = {};
const resourceOperationFields: Record<string, Record<string, INodeProperties[]>> = {};

const handleProperty = (item: INodeProperties) => {
	if (item.displayName === 'Resource') {
		writeFileSync(basePath + 'Resources.ts', makeFile({ Resources: [item] }));
		return;
	}

	if (
		!item.displayOptions ||
		!item.displayOptions.show ||
		!item.displayOptions.show.resource ||
		item.displayOptions.show.resource.length > 1 ||
		typeof item.displayOptions.show.resource[0] !== 'string'
	) {
		console.error('unknown item', item);
		return;
	}
	const resource = item.displayOptions.show.resource[0];

	if (item.displayName === 'Operation') {
		if (!resourceOperations[resource]) {
			resourceOperations[resource] = [];
		}
		resourceOperations[resource].push(item);
		return;
	}

	if (
		!item.displayOptions ||
		!item.displayOptions.show ||
		!item.displayOptions.show.operation ||
		item.displayOptions.show.operation.length > 1 ||
		typeof item.displayOptions.show.operation[0] !== 'string'
	) {
		console.error('unknown item', item);
		return;
	}
	const operation = item.displayOptions.show.operation[0].replace(/\s+/g, '');

	if (!resourceOperationFields[resource]) {
		resourceOperationFields[resource] = {};
	}
	if (!resourceOperationFields[resource][operation]) {
		resourceOperationFields[resource][operation] = [];
	}

	if (item.type === 'string') {
		item.default = '';
	}
	if (item.type === 'notice' && /^(GET|HEAD|PUT|POST|DELETE)/.test(item.displayName)) {
		return;
	}
	resourceOperationFields[resource][operation].push(item);
};

properties.forEach(handleProperty);

const imports: string[] = [];
for (const resource in resourceOperations) {
	if (!existsSync(basePath + resource)) {
		mkdirSync(basePath + resource);
	}
	writeFileSync(
		basePath + resource + '/Operations.ts',
		makeFile({ [resource]: resourceOperations[resource] }),
	);
}
for (const resource in resourceOperationFields) {
	imports.push(resource);
	writeFileSync(basePath + resource + '/Fields.ts', makeFile(resourceOperationFields[resource]));
}

writeFileSync(
	basePath + 'Operations.ts',
	imports.map((key) => `import ${key} from './${key}/Operations';`).join('\n') +
		'\n' +
		'\n' +
		'export default [\n' +
		imports.map((key) => '\t...' + key).join(',\n') +
		',\n]\n',
);
writeFileSync(
	basePath + 'Fields.ts',
	imports.map((key) => `import ${key} from './${key}/Fields';`).join('\n') +
		'\n' +
		'\n' +
		'export default [\n' +
		imports.map((key) => '\t...' + key).join(',\n') +
		',\n]\n',
);
