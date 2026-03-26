# n8n Node Description Conventions

Reference for manually fixing auto-generated description files from `src/generate-descriptions-from-openapi.ts`.

## What the auto-generator gets wrong

After running the generator with a new `src/openapi.json`, the output needs manual fixes:

1. **JSON format instead of TypeScript** — Generator outputs JSON-style (`"key": "value"`) instead of TS-style (
   `key: 'value'`). Rewrite to use single-quoted TS object literals with tabs for indentation.

2. **`resource` values contain spaces** — Generator creates names like `'Claims Schaden'`. Remove spaces:
   `'ClaimsSchaden'`. Also rename directories accordingly.

3. **`description` duplicates `action`** — Generator sets `description` = `action` on operations. Remove the
   `description` field from operations (unless it adds genuinely useful info beyond the action name).

4. **Empty `default` on operation selector** — Generator sets `default: ''`. Set it to the first operation's value (e.g.
   `default: 'List Claims By Contract'`).

5. **`action` casing is wrong** — Generator uses title-case for every word (e.g. `'Create Claim'`). Convention: only the
   verb and resource name are capitalized, prepositions are lowercase: `'List claims by contract'`, `'Create claim'`.

6. **Date fields use `type: 'string'`** — Should be `type: 'dateTime'` with the standard date formatting expression:
   ```ts
   value: '={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}'
   ```

7. **ID path parameters are missing** — Operations that reference `{{$parameter["some_id"]}}` in URLs need corresponding
   field definitions. The generator often omits them or makes them empty arrays. Add fields like:
   ```ts
   {
       displayName: 'Ameise Vertragsnummer',
       name: 'vertrag_ameise_id',
       type: 'string',
       default: '',
       required: true,
       description: 'The ID of the Vertrag in Ameise',
       displayOptions: { show: { resource: ['...'], operation: ['...'] } },
   }
   ```
   For Kunde IDs, use `resourceLocator` type with search via `Shared['Kunde Ameise ID']` from `../Kunde/Shared`.

8. **`resourceLocator` types replaced with `string`/`number`** — Generator loses hand-tuned `resourceLocator` fields
   with searchable dropdown modes. Keep existing `resourceLocator` definitions; use the `Shared` module where available.

9. **`required` placed before `displayName`** — n8n eslint rule requires `displayName` as the first property in every
   field object. Always put `displayName` first.

10. **Optional fields not grouped in collections** — Generator flattens all fields as top-level. Group
    optional/non-required fields inside a `type: 'collection'` wrapper:
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

11. **Pagination fields not grouped** — List operations should have pagination in a collection:
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
    For POST filter endpoints, use `_skip`/`_limit` in the body instead of `per_page`/`page` in the query.

12. **`action` casing must be sentence-case** — The eslint rule `node-param-operation-option-action-miscased` enforces
    sentence case on `action` strings. Only the first word is capitalized: `'List claims by contract'`, not
    `'List Claims By Contract'`.

13. **`description` duplicating `name` on operation options** — The eslint rule
    `node-param-option-description-identical-to-name` flags descriptions that match the option name. Remove the
    `description` field from operation options entirely (unless it adds genuinely different info).

14. **Test/example default values leak in** — Generator picks up example values from the OpenAPI spec (e.g.
    `default: 16`, `default: 87`). Replace with sensible defaults: `''` for strings, `''` for numbers (or a meaningful
    default like `50` for per_page), `false` for booleans.

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
        default: 'First Operation Name',  // always set to first option
    },
];

export default ResourceName;
```

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
- Date fields: use the `dateTime` type with `(new Date($value)).toDateTime().format("yyyy-MM-dd")` expression

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
