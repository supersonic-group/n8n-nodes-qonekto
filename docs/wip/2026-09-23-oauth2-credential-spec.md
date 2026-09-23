# OAuth2 credential for the Qonekto nodes — spec

## Problem

The Qonekto server (mvp-connector) now offers OAuth for the Tenant API: discovery, dynamic client
registration, authorization code with mandatory PKCE S256, and a required RFC 8707 `resource` that
names tenant and surface. The nodes only support a pasted API token. Users should be able to connect
by signing in to Qonekto instead, without anyone handing out a client ID.

## Solution

A second credential, "Qonekto OAuth2 API", built on n8n's generic OAuth2 credential with n8n's own
dynamic client registration switched on (ADR 0001). The user enters tenant and base URL; n8n derives
the tenant's API URL from them, discovers the authorization server from it, registers itself as a
public PKCE client, and sends the tenant API URL as `resource` on authorize, code exchange and refresh.

Both nodes — Qonekto and Qonekto Trigger — get an Authentication selector (API Token / OAuth2).

A working prototype of the credential and the action-node selector was verified end to end on review
(tenant `testmakler`, client approved since): discovery, registration, consent, token, Who Am I.

## Behavior

- **Credential fields:** Tenant and Base URL, identical to the API token credential (Base URL offers
  Production only; review and other hosts are set by expression). Everything OAuth-specific is
  hidden: the dynamic-registration flag and the server URL, which is base URL plus tenant.
- **Connect:** n8n discovers, registers and opens the consent screen. Scopes come from the tenant's
  protected-resource document (`api-read api-full`); the user may narrow them on consent.
- **Pending client:** a new n8n host is a pending client until Qonekto support approves it; until then
  non-superadmins see "noch nicht freigegeben". Nothing in the node handles this — it is documented.
- **Selector:** defaults to API Token on both nodes, so existing workflows are unchanged and no node
  version bump is needed. The action node's declarative requests and the shared request helper
  (used by load-options, the trigger's webhook lifecycle and the binary operations) both resolve the
  credential from the selector. Where the selector is absent the API token credential is used.
- **Subtitle and base URL** keep reading tenant and base URL from whichever credential is selected;
  both credentials carry those fields under the same names.

## Implementation decisions

- Dynamic registration, not a pasted client ID or a first-party client (ADR 0001).
- One credential per surface: the nodes only call the Tenant API; MCP is not a surface of this package.
- The trigger gets OAuth too. The server accepts OAuth grants on the managed-webhook routes; creating
  and deleting a webhook needs `api-full`.
- No custom handling of a narrowed grant: a 403 `insufficient_scope` surfaces as n8n's normal API
  error; the README says writes and triggers need full access.
- No credential `test` request: n8n tests OAuth2 credentials by the presence of an access token.
- German translations for the new credential and the selector, matching the existing ones.
- **README**, Credentials section, extended with:
  - how to connect, and the one-time approval by Qonekto support per n8n host;
  - minimum n8n version 2.35.0 (token refresh for dynamically registered credentials);
  - writes and the trigger need full access on the consent screen;
  - troubleshooting: n8n's public base URL must be HTTPS (or loopback) or registration is refused;
    a changed n8n host is a new pending client; registration is limited to 10 per hour per IP and
    runs on every Connect; after 30 days without use the refresh token lapses and the credential
    must be reconnected;
  - MCP: use n8n's built-in MCP Client Tool node with its MCP OAuth2 credential and the tenant's
    `/mcp` URL — backed by the verification run below.
- **Release:** merge to main; the npm release waits until OAuth is on production.

## Testing decisions

No unit test suite exists; the automated gates are lint, typecheck and build. The feature is proven by
a live verification run on review, recorded as a new file in the verification docs with the commits of
both repos, in the format of the existing run:

1. Connect the OAuth2 credential with the approved client (no superadmin bypass needed any more).
2. Qonekto node, OAuth2: Who Am I.
3. One write operation.
4. Qonekto Trigger, OAuth2: activate (webhook created) and deactivate (webhook deleted).
5. An execution more than one hour after the last token was issued, proving refresh (with `resource`).
6. The API token path still works unchanged on both nodes (regression).
7. n8n's MCP Client Tool node with the MCP OAuth2 credential against the tenant's `/mcp` URL: connect
   and list tools.

Anything that fails is recorded with its exact error, not worked around in the node.

## Out of scope

- n8n cloud: unverified community nodes cannot be installed there; revisit after verification.
- A first-party OAuth client, a pasted client ID, and client ID metadata documents.
- The non-superadmin pending page and any other server-side behavior — reported to the mvp-connector
  session instead.

## Open questions

- None blocking. Whether n8n cloud's registration hook rewrites the redirect URI is unknown and only
  matters after verification.

## ADRs

- 0001 — OAuth uses n8n's dynamic client registration, not a pre-registered client
