# n8n Node Description Conventions

Reference for writing the description files by hand. Descriptions are hand-written against the
API source — see the repo root `CLAUDE.md` for where the contract lives. `npm run lint` enforces
some of the rules below (each is marked); the rest are convention and are not checked. Lint runs
n8n's default config in strict mode, the same rules n8n's verification scanner applies — keep
`eslint.config.mjs` unmodified, or lint passes while the submission fails.

## Rules

1. **TypeScript style, not JSON.** Single-quoted TS object literals (`key: 'value'`), tabs for
   indentation.

2. **`resource` values contain no spaces** — `'ClaimsSchaden'`, not `'Claims Schaden'`. The
   directory name matches the resource value.

3. **`description` must not duplicate `action` or `name`.** Omit it entirely unless it adds
   genuinely useful information beyond the action name. *(Lint:
   `node-param-option-description-identical-to-name`.)*

4. **The operation selector's `default` is a real operation value** — e.g.
   `default: 'List Claims By Contract'`. Never `''`.

5. **`action` is sentence case** — only the first word is capitalized: `'List claims by
   contract'`, not `'List Claims By Contract'`. *(Lint:
   `node-param-operation-option-action-miscased`.)*

6. **Date-only fields use `type: 'dateTime'` and `DATE_ONLY_VALUE`** from `Routing.ts` — never a
   hand-written date expression:
   ```ts
   import { DATE_ONLY_VALUE } from '../Routing';

   value: DATE_ONLY_VALUE,
   ```
   Do **not** reintroduce `(new Date($value)).toDateTime().format("yyyy-MM-dd")`. It resolves the
   value in the instance's timezone (`GENERIC_TIMEZONE`, default `America/New_York`), so the
   UTC-midnight value the date picker produces formats as the *previous day* on any instance
   behind UTC. That snippet was pasted into 12 fields and every one of them sent dates a day
   early. `.toUTC()` is not a sufficient fix either — it corrects UTC-midnight but still shifts an
   ISO string carrying a non-UTC offset. `DATE_ONLY_VALUE` keeps whatever offset the value carries,
   so the date the user picked is the date the API receives.

   A field that means a genuine *instant* rather than a calendar date (an ATOM timestamp, say)
   is a different case — it wants a UTC conversion, not this constant. `datum` on the Kunde
   archive entry is the one such field.

7. **Every ID path parameter needs a field definition.** An operation whose URL references
   `{{$parameter["some_id"]}}` must define the matching field:
   ```ts
   {
       displayName: 'Ameise Contract Number',
       name: 'vertrag_ameise_id',
       type: 'string',
       default: '',
       required: true,
       description: 'The ID of the contract in Ameise',
       displayOptions: { show: { resource: ['...'], operation: ['...'] } },
   }
   ```
   Route model binding resolves by `ameise_id`, so these carry Ameise IDs. For Kunde IDs use the
   `resourceLocator` from `Shared['Kunde Ameise ID']` (`../Kunde/Shared`) rather than a plain
   string.

8. **Prefer `resourceLocator` over `string`/`number` where a searchable dropdown exists.** Use the
   `Shared` module rather than redefining one.

9. **`displayName` is the first property** in every field object. *(Lint requires it.)*

10. **Optional fields are grouped in a collection**, not flattened as top-level fields:
    ```ts
    {
        displayName: 'Optional Fields',
        name: 'optional fields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [ /* optional fields here */ ],
        displayOptions: { show: { resource: ['...'], operation: ['...'] } },
    }
    ```
    This also means an unset field is omitted from the request entirely rather than sent empty —
    which matters when the API distinguishes "absent" from "null".

11. **Pagination is grouped in its own collection** on list operations:
    ```ts
    {
        displayName: 'Pagination Fields',
        name: 'pagination fields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [
            { displayName: 'Per Page', name: 'per_page', type: 'number', default: 50,
              description: 'Changes per_page used for pagination from default 25 to max 100',
              routing: { send: { type: 'query', property: 'per_page', value: '={{ $value }}', propertyInDotNotation: false } } },
            { displayName: 'Page', name: 'page', type: 'number', default: 1,
              description: 'Returns result of given page number, when Pagination is enabled',
              hint: 'Requires "Per Page" to be set to enable Pagination',
              routing: { send: { type: 'query', property: 'page', value: '={{ $value }}', propertyInDotNotation: false } } },
        ],
        displayOptions: { show: { resource: ['...'], operation: ['...'] } },
    }
    ```
    For POST filter endpoints, use `_skip`/`_limit` in the body instead of `per_page`/`page` in
    the query.

    An operation whose response is a *paginated envelope* also gets a Return All toggle, placed
    immediately above its Pagination Fields collection:
    ```ts
    import { returnAllField } from '../Pagination';

    returnAllField('Kunde', 'List Kunden'),
    ```
    That is the whole change — the walk itself lives in `Pagination.ts` and is registered once as
    the node's `requestOperations.pagination`, so it runs for whichever operation has Return All
    on. It reads either envelope (the connector's Laravel paginator, or the Ameise
    `items`/`numberOfPages` one the Tasks and Claims endpoints pass through) and returns one item
    per record; a response it does not recognise falls back to the single-page behaviour.

    Check the endpoint can actually be paged before adding the toggle, and check what it calls
    the page size. Verify against a result set large enough to span pages: an endpoint that
    ignores the parameter answers `numberOfPages: 1` with everything in it, which is
    indistinguishable from a short list. Customer relations reads `pageSize`, not `perPage`, and
    ignoring that is exactly what made it look paginated for as long as it was not
    (`CustomerRelationsCtrl::index` also forwarded nothing at all until the v1 path landed). The
    walk sends all three spellings, so the only thing that has to be right here is the collection
    field the user sets.

12. **Idempotency is wired automatically — do not hand-roll it per operation.** Every non-GET
    operation whose URL is not a `/filter` read reaches a route carrying the connector's
    `EnsureWriteIdempotency` middleware, and `Idempotency.ts` derives that set from the
    operations themselves: `Operations.ts` wraps its export in `withIdempotencyMarker()`, which
    attaches a postReceive marking a replayed response with `_idempotency_replayed`, and
    `Fields.ts` appends `idempotencyKeyField(Operations)`, the optional `Idempotency-Key`. A new
    write operation is covered by adding it to its resource's `Operations.ts` and nothing else.

    A custom operation (`customOperations` in `Qonekto.node.ts`) never goes through declarative
    routing, so it carries both itself — see `Upload File`, and the `CUSTOM_WRITE_OPERATIONS`
    list in `Idempotency.ts` that keeps its key field visible.

13. **Defaults are sensible, never example values from the API docs.** `''` for strings and
    numbers (or something meaningful like `50` for `per_page`), `false` for booleans. A stray
    `default: 16` is an example value that leaked in.

14. **`placeholder` must survive the lint rules.** `node-param-placeholder-miscased-id`
    force-uppercases a bare `id` token, which will silently turn a real field name into a wrong
    one — pick an example that avoids it rather than accepting the autofix.

15. **Everything a user reads is English; everything the API reads stays as it is.** n8n only
    verifies nodes whose UI is English, so `displayName`, option `name`, `action`,
    `description`, `placeholder` and `hint` are English (Kunde → Customer, Vertrag → Contract,
    Sparte → Division, Vermittler → Broker, Gesellschaft → Insurer — the Trigger node's terms).
    Parameter `name`s and option `value`s keep their German API spelling: saved workflows store
    them, so renaming one silently breaks every workflow that uses it. The API's German
    validation messages are paraphrased (`At most 255 characters`), not pasted.

16. **Lists of five or more options, and collections, are alphabetical by label.** *(Lint:
    `node-param-options-type-unsorted-items`, `node-param-collection-type-unsorted-items`.)*
    The rules report their autofix as available but apply nothing; reorder by hand.

## Conventions

### Operations.ts structure

```ts
import { INodeProperties } from 'n8n-workflow';

export const ResourceName: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['ResourceName'],
            },
        },
        options: [
            {
                name: 'Operation Name',
                value: 'Operation Name',
                action: 'Operation name',  // lowercase after first word
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/path',
                    },
                },
            },
        ],
        default: 'Operation Name',  // any real operation value
    },
];

export default ResourceName;
```

Operations are alphabetical by `name` once there are five or more (rule 16); shorter lists
follow the API's route order.

### Fields.ts structure

```ts
import {INodeProperties} from 'n8n-workflow';
// Import Shared if you need resourceLocator fields for Kunde, Vermittler, etc.
// import { Shared } from '../Kunde/Shared';

export const OperationName: INodeProperties[] = [
    // Required fields first (top-level, with required: true)
    // Then optional fields grouped in a collection
    // Then pagination if applicable
];

// Repeat for each operation...

export default [
    ...OperationName,
    // ...
];
```

### Field property order

1. `displayName`
2. `name`
3. `type`
4. `default`
5. `required` (if true)
6. `description` (if non-empty)
7. `options` / `modes` (if applicable)
8. `routing`
9. `displayOptions`

### Routing conventions

- Body fields: `{ send: { property: 'name', propertyInDotNotation: false, type: 'body', value: '={{ $value }}' } }`
- Query fields: `{ send: { type: 'query', property: 'name', value: '={{ $value }}', propertyInDotNotation: false } }`
- Date-only fields: use the `dateTime` type with `value: DATE_ONLY_VALUE` (see rule 6)

### Shared module (`../Kunde/Shared`)

Available shared field definitions (all `resourceLocator` type with search):

- `Shared['Kunde Ameise ID']` — Ameise Kundennummer with search
- `Shared['Anrede ID']` — Anrede with list
- `Shared['Vermittler ID']` — Vermittler with list
- `Shared['Land ID']` — Land with list
- `Shared['Rechtsform ID']` — Rechtsform with list
- `Shared['Sparte ID']` — Sparte with list

Use spread syntax: `{ ...Shared['Kunde Ameise ID'], displayOptions: { ... } }`
Override properties after spread as needed (e.g. `required: false`).

Resources with a field repeated across several of their own operations keep a local `Shared.ts`
(see `TasksAufgaben/Shared.ts`); a field used in only one or two places is defined inline.
