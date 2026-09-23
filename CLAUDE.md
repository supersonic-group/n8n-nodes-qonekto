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

## What is known to work

`docs/verification/` holds the live coverage runs: which operations were executed against a real
API, at which commit of this repo and of `mvp-connector`, and which were blocked or skipped.
Check the newest one before assuming an operation has ever succeeded — several fail upstream
regardless of what the node sends.

## Authentication

Both nodes pick `qonektoApi` or `qonektoOAuth2Api` through their `authentication` parameter. The
declarative routing matches it against each credential's `displayOptions`; the shared request helper
evaluates the same parameter itself. Keep both in step when adding a credential or a value.

The OAuth2 credential relies on n8n's dynamic client registration (ADR 0001); n8n ≥ 2.35.0 is needed
for refresh. Testing it against review (`https://review.qonekto.de`, OAuth is not on production yet):
set Base URL by expression, with the trailing slash. A superadmin passes a pending client's
"noch nicht freigegeben" gate, so connecting as one does not prove approval works.

## Translations

The files under `*/translations/de/` are in the key shape n8n's editor reads — nested
`nodeView.<param>.displayName` and `nodeView.<param>.options.<value>.displayName`, never dotted keys
or `.name` — but n8n (checked 2.37.10 through 2.41.0) renders none of them: it registers a community
node's translation under the short node name and looks it up under the full type, and reads credential
translations only from `n8n-nodes-base`. Still true on n8n `master` as of 2026-09-23, which also ships no
locale but `en` for the editor or any built-in node. Keep them in that shape anyway; an unrendered label is
not evidence of a wrong key. Option values containing dots (the Base URL) cannot be keyed at all.

## Local dev

`npm run dev` (`n8n-node dev`) runs n8n at `http://localhost:5678` with its data in
`~/.n8n-node-cli/.n8n/`; nodes are typed `CUSTOM.qonekto` there. The editor UI is English-only.

## Writing descriptions

`nodes/Qonekto/descriptions/CONVENTIONS.md` is the reference — field property order, routing
shapes, the `Shared` module, naming and casing. Follow it; `npm run lint` enforces part of it
but not all.

## n8n verification

n8n verifies a published version by running `npx @n8n/scan-community-package n8n-nodes-qonekto`: it
lints the GitHub source the npm provenance points at, plus the tarball's `dist/`. `npm run lint` runs the
same rule set only while `eslint.config.mjs` is the unmodified default and `package.json` has
`n8n.strict: true`. A hand-copied config once disabled the ordering rules and dropped the
`@n8n/community-nodes` plugin, so lint was green while the scanner failed. The scanner checks only
published versions; check `main` before a release by importing `analyzePackage` and
`SOURCE_FILE_PATTERNS` from the scanner package and running them against the repo and `dist/`.
Anything outside `n8n-workflow`, `crypto` and a few others is a forbidden import, including Node
built-ins such as `url` and `stream`, even as type-only imports.
