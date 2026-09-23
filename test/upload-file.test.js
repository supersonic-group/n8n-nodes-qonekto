// Upload File builds its multipart request by hand (n8n Cloud forbids form-data), so these tests
// run the operation the way n8n does and read back the request it hands to n8n's HTTP helper.
// Runs against the compiled node: `npm run build` first.
const { test } = require('node:test');
const assert = require('node:assert');
const { Qonekto } = require('../dist/nodes/Qonekto/Qonekto.node.js');

const FILE = Buffer.from('%PDF-1.4\r\n\x00\xff binary', 'latin1');

function uploadFile(parameters) {
	const params = {
		authentication: 'accessToken',
		kunde_ameise_id: { __rl: true, mode: 'id', value: '170430' },
		file: 'data',
		betreff: '',
		'optional fields': {},
		idempotencyKey: '',
		...parameters,
	};
	const requests = [];
	const context = {
		getInputData: () => [{ json: {}, binary: { data: {} } }],
		getNodeParameter: (name, _i, fallback) => (name in params ? params[name] : fallback),
		getCredentials: async () => ({ tenant: 'demo', base_url: 'https://example.test/api/' }),
		getNode: () => ({ name: 'Qonekto', type: 'n8n-nodes-qonekto.qonekto', typeVersion: 1, parameters: {} }),
		continueOnFail: () => false,
		helpers: {
			assertBinaryData: () => ({ fileName: 'Prüfbericht.pdf', mimeType: 'application/pdf' }),
			getBinaryDataBuffer: async () => FILE,
			httpRequestWithAuthentication: async (_credentialType, options) => {
				requests.push(options);
				return { body: { id: 1 }, headers: {}, statusCode: 201 };
			},
			returnJsonArray: (data) => [].concat(data).map((json) => ({ json })),
			constructExecutionMetaData: (items) => items,
		},
	};
	const run = new Qonekto().customOperations.Kunde['Upload File'].call(context);
	return run.then(() => {
		assert.strictEqual(requests.length, 1);
		return parseMultipart(requests[0]);
	});
}

// Splits a multipart/form-data body into { name, filename, contentType, value } parts.
function parseMultipart(request) {
	const boundary = /boundary=(.+)$/.exec(request.headers['Content-Type'])[1];
	const body = request.body.toString('latin1');
	return body
		.split(`--${boundary}`)
		.slice(1, -1)
		.map((chunk) => {
			const [head, ...rest] = chunk.slice(2, -2).split('\r\n\r\n');
			return {
				name: /name="([^"]*)"/.exec(head)[1],
				filename: /filename="([^"]*)"/.exec(head)?.[1],
				contentType: /Content-Type: (.*)/.exec(head)?.[1],
				value: Buffer.from(rest.join('\r\n\r\n'), 'latin1'),
			};
		});
}

const values = (parts, name) => parts.filter((p) => p.name === name).map((p) => p.value.toString());

test('tags set under Optional Fields are sent, so the archive entry is tagged', async () => {
	const parts = await uploadFile({ 'optional fields': { tags: '["Vertrag","n8n"]' } });
	assert.deepStrictEqual(values(parts, 'tags[]'), ['Vertrag', 'n8n']);
});
