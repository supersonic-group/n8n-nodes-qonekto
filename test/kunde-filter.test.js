// The two timestamp filters on Filter Kunden take the API's own grammar (mvp-connector ADR 0062):
// a year, month or date matches that whole Berlin period, an ISO time matches to the second. The
// node checks a value before sending so a typo fails on the node, naming the field, instead of as
// a bare 422. The accepted and rejected cases were run through the API's exact rule
// (CustomerFilterRules::TIMESTAMP_FORMAT under Laravel's date_format), so the node rejects nothing
// the API would take.
// Runs against the compiled node: `npm run build` first.
const { test } = require('node:test');
const assert = require('node:assert');
const { Qonekto } = require('../dist/nodes/Qonekto/Qonekto.node.js');
const { DATE_ONLY_VALUE } = require('../dist/nodes/Qonekto/descriptions/Routing.js');
const { NodeHelpers } = require('n8n-workflow');

const FIELDS = ['last_simplr_login_at', 'maklervollmacht_created_at'];

const description = new Qonekto().description;
// The version a node dropped into a workflow gets.
const LATEST = Math.max(...[].concat(description.version));
// The version every workflow saved before these fields took the API's grammar is on.
const DATE_PICKER_VERSION = 20250926;

// The field n8n shows and routes for a node of this version: options sharing a name are told
// apart by their `@version` display rule, the way the editor and the routing both resolve them.
function filterField(name, typeVersion = LATEST) {
	const filters = description.properties.find(
		(p) => p.name === 'filters' && p.displayOptions?.show?.operation?.includes('Filter Kunden'),
	);
	const values = { resource: 'Kunde', operation: 'Filter Kunden', filters: { [name]: '' } };
	const shown = filters.options.filter(
		(o) => o.name === name && NodeHelpers.displayParameter(values, o, { typeVersion }, description, values),
	);
	assert.strictEqual(shown.length, 1, `${name} at ${typeVersion}: ${shown.length} fields shown`);
	return shown[0];
}

// Runs the field's preSend the way n8n's routing does once the value is in the body.
async function send(name, value) {
	const context = {
		getNode: () => ({ name: 'Qonekto', type: 'n8n-nodes-qonekto.qonekto', typeVersion: 1, parameters: {} }),
		getItemIndex: () => 0,
	};
	let options = { method: 'POST', url: '/kunde/filter', body: { [name]: value } };
	for (const preSend of filterField(name).routing.send.preSend ?? []) {
		options = await preSend.call(context, options);
	}
	return options;
}

const ACCEPTED = [
	// A field added and left blank: the API reads '' as null and ignores the filter.
	'',
	'2024',
	'2024-05',
	'2024/05',
	'2024-05-01',
	'2024/05/01',
	'2024-02-29',
	'0000-02-29',
	'0000-01-01T00:00:00',
	'2024-05-01 10:00',
	'2024-05-01 10:00:00.123456',
	'2024-05-01T10:00',
	'2024-05-01T10:00:00',
	'2024-05-01T10:00Z',
	'2024-05-01T10:00+0200',
	'2024-05-01T10:00:00.123+02:00',
	'2024-05-01T10:00:00-0530',
	'2024-05-01T10:00:00+00:00',
	'2024-05-01T10:00:00+99:59',
	// What KundeResource returns, so a value read from a customer filters as it stands.
	'2024-05-01T08:00:00.000000Z',
];

const REJECTED = [
	'2024-13',
	'24',
	'20245',
	'01.05.2024',
	'2023-02-29',
	'2024-04-31',
	'2024-05-00',
	'2024-05/01',
	'2024-5-1',
	'2024-05-01T24:00',
	'2024-05-01T10:00:60',
	'2024-05-01 10:00Z',
	'2024-05-01 10:00:00+02:00',
	'2024-05-01T10:00:00.12',
	'2024-05-01T10:00.123',
	'2024-05-01T10:00:00z',
	'2024-05-01T10',
	'2024-05-01T10:00:00+02',
	'2024-05-01T10:00:00+02:60',
	'2024-05-01T10:00:00-00:00',
	'2024/05/01T10:00:00',
	'2024 ',
	'abc',
];

for (const field of FIELDS) {
	test(`${field} sends every shape the API accepts, unchanged`, async () => {
		for (const value of ACCEPTED) {
			const options = await send(field, value);
			assert.strictEqual(options.body[field], value, value);
		}
	});

	test(`${field} fails on the node for every shape the API would 422, naming field and value`, async () => {
		for (const value of REJECTED) {
			await assert.rejects(send(field, value), (error) => {
				assert.match(error.message, new RegExp(field), value);
				assert.ok(error.message.includes(`"${value}"`), `${value}: ${error.message}`);
				return true;
			});
		}
	});
}

// n8n cannot rewrite a saved workflow, so the grammar arrived as a new node version. A saved node
// keeps the picker, whose value is sent as its date and so filters the whole Berlin day.
test('a node saved before the text fields keeps its date picker, sent as the date it shows', () => {
	for (const field of FIELDS) {
		const old = filterField(field, DATE_PICKER_VERSION);
		assert.strictEqual(old.type, 'dateTime');
		assert.strictEqual(old.routing.send.value, DATE_ONLY_VALUE);
		assert.strictEqual(old.routing.send.preSend, undefined);
	}
});

test('a node added now gets the text field that takes the API grammar', () => {
	for (const field of FIELDS) {
		assert.strictEqual(filterField(field).type, 'string');
	}
});

test('a year fed as a number by an expression is sent, as the API reads it as 2024', async () => {
	const options = await send('last_simplr_login_at', 2024);
	assert.strictEqual(options.body.last_simplr_login_at, 2024);
});

test('a Luxon DateTime fed by an expression is checked as the ISO string it serializes to', async () => {
	const { DateTime } = require('luxon');
	const now = DateTime.fromISO('2026-09-25T10:15:30.123+02:00', { setZone: true });
	await send('last_simplr_login_at', now);
});
