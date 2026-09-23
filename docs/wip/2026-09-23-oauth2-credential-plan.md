# OAuth2 credential — plan

Spec: `2026-09-23-oauth2-credential-spec.md`. ADR 0001. No unit test suite: the gates are lint and
build (what CI runs), plus the live run on review/testmakler. Baseline on ff4795e: lint and build green.

## Slices

1. **Action node over OAuth2** (tracer) — no blockers. The OAuth2 credential with dynamic
   registration, the Authentication selector on the Qonekto node, and the shared request helper
   resolving the credential from the evaluated selector with API Token as fallback. Delivers: a user
   picks OAuth2, connects, and runs Who Am I, a write, and an API-backed dropdown on review; the API
   token path behaves as before.
   **Checkpoint 1.**
2. **Trigger over OAuth2** — blocked by 1. The same selector and credential pair on the trigger.
   Delivers: activating a trigger workflow on OAuth2 creates its managed webhook on review, and
   deactivating deletes it. Event delivery to a localhost n8n cannot be exercised and is recorded as
   such.
3. **Docs** — blocked by 1, 2. German translations for the new credential and both selectors; the
   README Credentials section with connect, approval, minimum n8n version, full-access requirement,
   troubleshooting and the MCP note. Delivers: a user can set up and debug OAuth from the README alone.
4. **Verification run** — blocked by 1–3. The live run recorded in the verification docs: every step
   of the spec's testing decisions, including a refresh after more than an hour, the API token
   regression on both nodes and n8n's MCP Client Tool against the tenant's `/mcp` URL.
   **Final review.**

## Ledger

- Checkpoint 1: BASE 2691668, reviewed HEAD 17cbbed; next interval BASE 17cbbed. Correctness: no findings. Fidelity: 0 fixed; deferred to slice 4 — API token run on both nodes, subtitle with OAuth2 selected; rejected — credential property order (mirrors qonektoApi, CONVENTIONS scopes itself to descriptions). Out of branch: 429 retry arguments swapped in qonektoApiRequest, raised to the user.
- Final review: BASE 0d692d1 (branch point, whole branch), reviewed HEAD 79aa606. Fixed in f7bab93 — README loopback wording, the tenant-URL error's location and its trailing-slash cause, run record (approved-client connect only via MCP, refresh evidence, resource-on-refresh from source only, unrecorded early connector commit). Fixed in 7eb216a — translations rewritten to the nested key format n8n's editor reads (options.<value>.displayName); the URL-valued Base URL option cannot be keyed and was dropped; n8n itself cannot render community node or credential translations (2.37.10 through 2.41.0), upstream issue drafted for the user. Rejected — leftover webhook when switching an active trigger's credential (pre-existing, same as switching tokens), getNodeParameter duck-typing (the helper's type excludes IExecuteSingleFunctions), unexpected selector values, duplicated selector definition, double credential decrypt (pre-existing). Open with the user — subtitle with OAuth2 selected; the swapped 429 retry arguments in qonektoApiRequest (pre-existing).
