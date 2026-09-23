// The trigger's webhook lifecycle as n8n drives it on activation and deactivation.
// Runs against the compiled node: `npm run build` first.
const { test } = require('node:test');
const assert = require('node:assert');
const { NodeApiError } = require('n8n-workflow');
const { QonektoTrigger } = require('../dist/nodes/Qonekto/QonektoTrigger.node.js');

const NODE = { name: 'Qonekto Trigger', type: 'n8n-nodes-qonekto.qonektoTrigger', typeVersion: 1, parameters: {} };

function hookContext(respond, staticData = { webhookId: 'wh1', webhookToken: 'tok' }) {
	const warnings = [];
	return {
		staticData,
		warnings,
		getNodeParameter: (_name, fallback) => fallback,
		getCredentials: async () => ({ tenant: 'demo', base_url: 'https://example.test/api/' }),
		getNode: () => NODE,
		getWorkflowStaticData: () => staticData,
		logger: { warn: (message, meta) => warnings.push({ message, meta }) },
		helpers: { httpRequestWithAuthentication: async (_type, options) => respond(options) },
	};
}

const apiError = (httpCode) =>
	new NodeApiError(NODE, { message: `HTTP ${httpCode}`, httpCode }, { httpCode });

test('a webhook the API no longer knows is reported as gone, so n8n registers a new one', async () => {
	const context = hookContext(() => {
		throw apiError('404');
	});
	const exists = await new QonektoTrigger().webhookMethods.default.checkExists.call(context);
	assert.strictEqual(exists, false);
	assert.strictEqual(context.staticData.webhookId, undefined);
});

test('any other lookup failure surfaces with the API error intact, not a generic one', async () => {
	const context = hookContext(() => {
		throw apiError('500');
	});
	await assert.rejects(new QonektoTrigger().webhookMethods.default.checkExists.call(context), (error) => {
		assert.ok(error instanceof NodeApiError);
		assert.strictEqual(error.httpCode, '500');
		return true;
	});
	assert.strictEqual(context.staticData.webhookId, 'wh1', 'a transient failure must not forget the webhook');
});

test('a failed webhook deletion is logged and reported, and the webhook is kept for a retry', async () => {
	const context = hookContext(() => {
		throw apiError('503');
	});
	const deleted = await new QonektoTrigger().webhookMethods.default.delete.call(context);
	assert.strictEqual(deleted, false);
	assert.strictEqual(context.warnings.length, 1);
	assert.strictEqual(context.staticData.webhookId, 'wh1');
});
