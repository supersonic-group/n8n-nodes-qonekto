# n8n Node Description Conventions

Reference for writing the description files by hand. Descriptions are hand-written against the
API source — see the repo root `CLAUDE.md` for where the contract lives. `npm run lint` enforces
some of the rules below (each is marked); the rest are convention and are not checked.

## Rules

1. **TypeScript style, not JSON.** Single-quoted TS object literals (`key: 'value'`), tabs for
   indentation.

2. **`resource` values contain no spaces** — `'ClaimsSchaden'`, not `'Claims Schaden'`. The
   directory name matches the resource value.

3. **`description` must not duplicate `action` or `name`.** Omit it entirely unless it adds
   genuinely useful information beyond the action name. *(Lint:
   `node-param-option-description-identical-to-name`.)*

4. **The operation selector's `default` is the first operation's value** — e.g.
   `default: 'List Claims By Contract'`. Never `''`.

5. **`action` is sentence case** — only the first word is capitalized: `'List claims by
   contract'`, not `'List Claims By Contract'`. *(Lint:
   `node-param-operation-option-action-miscased`.)*

6. **Date fields use `type: 'dateTime'`** with the standard formatting expression:
   ```ts
   value: '={{ $value && (new Date($value)) ? (new Date($value)).toDateTime().format("yyyy-MM-dd") : null }}'
   ```

7. **Every ID path parameter needs a field definition.** An operation whose URL references
   `{{$parameter["some_id"]}}` must define the matching field:
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

12. **Defaults are sensible, never example values from the API docs.** `''` for strings and
    numbers (or something meaningful like `50` for `per_page`), `false` for booleans. A stray
    `default: 16` is an example value that leaked in.

13. **`placeholder` must survive the lint rules.** `node-param-placeholder-miscased-id`
    force-uppercases a bare `id` token, which will silently turn a real field name into a wrong
    one — pick an example that avoids it rather than accepting the autofix.

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

Operations are ordered to match the API's route order, not alphabetically.

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

Resources with a field repeated across several of their own operations keep a local `Shared.ts`
(see `TasksAufgaben/Shared.ts`); a field used in only one or two places is defined inline.
