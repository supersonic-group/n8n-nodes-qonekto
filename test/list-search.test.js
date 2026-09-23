// The customer search behind the Customer dropdown, as the editor calls it page by page.
// Runs against the compiled node: `npm run build` first.
const { test } = require('node:test');
const assert = require('node:assert');
const { Qonekto } = require('../dist/nodes/Qonekto/Qonekto.node.js');

function searchKunden(meta, paginationToken) {
	const context = {
		getNodeParameter: (_name, fallback) => fallback,
		getCredentials: async () => ({ tenant: 'demo', base_url: 'https://example.test/api/' }),
		getNode: () => ({ name: 'Qonekto', type: 'n8n-nodes-qonekto.qonekto', typeVersion: 1, parameters: {} }),
		helpers: {
			httpRequestWithAuthentication: async (_type, options) => ({
				body: { data: [{ ameise_id: 1, vorname: 'Ada', nachname: 'Muster', vermittler_id: 'B1' }], meta, query: options.qs },
				headers: {},
				statusCode: 200,
			}),
		},
	};
	return new Qonekto().methods.listSearch.searchKunden.call(context, 'Mus', paginationToken);
}

test('the dropdown offers the next page while there is one', async () => {
	const result = await searchKunden({ current_page: 1, last_page: 3 });
	assert.strictEqual(result.paginationToken, '2');
});

test('the dropdown stops on the last page instead of requesting it again', async () => {
	const result = await searchKunden({ current_page: 3, last_page: 3 }, '3');
	assert.strictEqual(result.paginationToken, undefined);
	assert.strictEqual(result.results[0].value, 1);
});
