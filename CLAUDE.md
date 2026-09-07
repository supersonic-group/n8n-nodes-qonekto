# n8n-nodes-qonekto

Community n8n node for the Qonekto Tenant API.

## Where the API contract lives

There is no OpenAPI spec in this repo. The authoritative contract is the API source at
`~/Sites/Icehouse/Custom/mvp-connector`:

- `routes/api/tenant/billable.php` — routes, HTTP verbs and the token-scope gates
- `app/Http/Controllers/Tenant/Api/*Ctrl.php` — request validation and the documented
  response shapes (Scribe `#[Endpoint]` / `#[DocResponse]` attributes)
- `app/Http/Resources/Tenant/*Resource.php` — the shape the endpoint actually returns
- `docs/adr/` — why an endpoint is the way it is

Read those before adding or changing an operation. A vendored spec snapshot used to live in
`src/`; it drifted out of date and was removed in favour of reading the source directly
(see git history for the generator that consumed it).

Route model binding resolves by `ameise_id`, not the primary key, so path parameters take Ameise
IDs. The rule lives in `app/Models/Tenant/Importable.php`. Mind the path: `app/Models/Tenant.php`
also defines `getRouteKeyName()` and returns `'slug'`, so grepping the symbol alone lands on both
and the wrong one looks plausible.

## Writing descriptions

`nodes/Qonekto/descriptions/CONVENTIONS.md` is the reference — field property order, routing
shapes, the `Shared` module, naming and casing. Follow it; `npm run lint` enforces part of it
but not all.
