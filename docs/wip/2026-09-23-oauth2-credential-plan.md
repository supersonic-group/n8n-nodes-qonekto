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
