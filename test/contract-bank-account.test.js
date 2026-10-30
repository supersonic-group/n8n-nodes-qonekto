// Change Contract Bank Account: SEPA needs an IBAN, and the holder only when the holder differs from
// the contract holder (customer bug on 2.3.0: the Stocks API rejects holder fields when deviant is
// false, and birthdate was mandatory although SEPA does not require one). So with deviant false the
// request is { iban, deviant } alone, and with deviant true the birthdate may stay empty.
// Runs against the compiled node: `npm run build` first.
const { test } = require('node:test');
const assert = require('node:assert');
const { Qonekto } = require('../dist/nodes/Qonekto/Qonekto.node.js');
const { NodeHelpers } = require('n8n-workflow');

const description = new Qonekto().description;
const LATEST = Math.max(...[].concat(description.version));
const OPERATION = 'Change Contract Bank Account';
const HOLDER = ['firstname', 'lastname', 'street', 'zip', 'city', 'nation'];

const fields = description.properties.filter(
	(p) => p.displayOptions?.show?.resource?.includes('ContractBankAccount') && p.routing?.send,
);

// The body properties n8n would route: only fields the editor shows for these parameter values.
function shownBodyProperties(deviant) {
	const values = { resource: 'ContractBankAccount', operation: OPERATION, deviant };
	return fields
		.filter((f) => f.displayOptions.show.operation.includes(OPERATION))
		.filter((f) => NodeHelpers.displayParameter(values, f, { typeVersion: LATEST }, description, values))
		.map((f) => f.routing.send.property)
		.sort();
}

async function runPreSend(field, body) {
	let options = { method: 'PUT', url: '/vertrag/1/bank-account', body };
	for (const preSend of field.routing.send.preSend ?? []) {
		options = await preSend.call({}, options);
	}
	return options.body;
}

test('deviant false routes only iban and deviant, so no holder field reaches the API', () => {
	assert.deepStrictEqual(shownBodyProperties(false), ['deviant', 'iban']);
});

test('deviant true routes the holder fields as well, birthdate included', () => {
	assert.deepStrictEqual(shownBodyProperties(true), ['birthdate', 'deviant', 'iban', ...HOLDER].sort());
});

test('iban and deviant are required; the holder fields are required, birthdate is not', () => {
	const required = Object.fromEntries(fields.map((f) => [f.name, f.required === true]));
	for (const name of ['iban', 'deviant', ...HOLDER]) assert.strictEqual(required[name], true, name);
	assert.strictEqual(required.birthdate, false);
});

test('an empty birthdate is omitted from the body, not sent as null or an empty string', async () => {
	const birthdate = fields.find((f) => f.name === 'birthdate');
	for (const empty of [null, '']) {
		const body = await runPreSend(birthdate, { iban: 'DE02', deviant: true, birthdate: empty });
		assert.deepStrictEqual(body, { iban: 'DE02', deviant: true });
	}
});

test('a given birthdate is kept', async () => {
	const birthdate = fields.find((f) => f.name === 'birthdate');
	const body = await runPreSend(birthdate, { iban: 'DE02', birthdate: '1990-01-15T00:00:00+01:00' });
	assert.strictEqual(body.birthdate, '1990-01-15T00:00:00+01:00');
});
