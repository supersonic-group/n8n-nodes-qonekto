// Upload File builds its multipart request by hand (n8n Cloud forbids form-data), so these tests
// run the operation the way n8n does and read back the request it hands to n8n's HTTP helper.
// Runs against the compiled node: `npm run build` first.
const { test } = require('node:test');
const assert = require('node:assert');
const { Qonekto } = require('../dist/nodes/Qonekto/Qonekto.node.js');

const FILE = Buffer.from('%PDF-1.4\r\n\x00\xff binary', 'latin1');

// Runs Upload File once. `file` and `fileName` describe the incoming binary.
function runUpload(parameters, { file = FILE, fileName = 'Prüfbericht.pdf' } = {}) {
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
			assertBinaryData: () => ({ fileName, mimeType: 'application/pdf' }),
			getBinaryDataBuffer: async () => file,
			httpRequestWithAuthentication: async (_credentialType, options) => {
				requests.push(options);
				return { body: { id: 1 }, headers: {}, statusCode: 201 };
			},
			returnJsonArray: (data) => [].concat(data).map((json) => ({ json })),
			constructExecutionMetaData: (items) => items,
		},
	};
	return { run: new Qonekto().customOperations.Kunde['Upload File'].call(context), requests };
}

async function uploadFile(parameters, binary) {
	const { run, requests } = runUpload(parameters, binary);
	await run;
	assert.strictEqual(requests.length, 1);
	return parseMultipart(requests[0]);
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

test('a Division ID picked from the list is sent as its ID, not as the locator object', async () => {
	const parts = await uploadFile({
		'optional fields': { sparte_id: { __rl: true, mode: 'list', value: '42', cachedResultName: 'Kfz' } },
	});
	assert.deepStrictEqual(values(parts, 'zuordnung[sparte_id]'), ['42']);
});

test('the file arrives byte for byte with its name and type, and names the entry when no subject is set', async () => {
	const parts = await uploadFile({});
	const file = parts.find((p) => p.name === 'file');
	assert.ok(file.value.equals(FILE), 'file bytes changed in transit');
	assert.strictEqual(Buffer.from(file.filename, 'latin1').toString('utf8'), 'Prüfbericht.pdf');
	assert.strictEqual(file.contentType, 'application/pdf');
	assert.deepStrictEqual(values(parts, 'betreff'), ['Prüfbericht.pdf']);
	assert.deepStrictEqual(values(parts, 'typ'), ['dokument']);
});

test('a subject titles the entry but the file keeps its own name, so it downloads as a PDF', async () => {
	const parts = await uploadFile({ betreff: 'Policy schedule' });
	assert.deepStrictEqual(values(parts, 'betreff'), ['Policy schedule']);
	const file = parts.find((p) => p.name === 'file');
	assert.strictEqual(Buffer.from(file.filename, 'latin1').toString('utf8'), 'Prüfbericht.pdf');
});
