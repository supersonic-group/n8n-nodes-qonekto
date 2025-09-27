import { OpenAPIV3 } from 'openapi-types';

export default function (doc: { paths: OpenAPIV3.PathsObject }) {
	const paths: OpenAPIV3.PathsObject = {};
	const trimRegex = /^\/api\/\{tenant}\//;
	Object.keys(doc.paths).forEach((path) => {
		paths[path.replace(trimRegex, '/')] = (doc.paths as OpenAPIV3.PathsObject)[path];
	});
	return { ...doc, paths };
}
