# OAuth2 run on review — 2026-09-23

The Qonekto OAuth2 API credential was connected and used against a real deployment, so there is a
commit at which OAuth is known to have worked end to end. Like the coverage run, this is a snapshot,
not a test suite: nothing re-runs it.

## What it was run against

| | |
| --- | --- |
| Node | `n8n-nodes-qonekto` on branch `feature/oauth2-credential`, at `17cbbed` (action node), `47cf44a` (trigger) and `f9cf83e` (the rest) |
| Connector | `https://review.qonekto.de`, deployed from `mvp-connector` branch `review`. The steps from 09:39 UTC on ran on `2301ccc0` or newer — its richer `whoami` token block appears in their output. The deployed commit for the earlier steps was not recorded; it predates `2301ccc0` |
| Tenant | `testmakler` |
| Date | 2026-09-23, 08:28–09:45 UTC |
| Runner | n8n 2.37.10 from `@n8n/node-cli` 0.46.4 (`n8n-node dev`), at `http://localhost:5678`, driven by hand in the editor |
| Client | `01a0cd61-0c3c-713d-8f0c-06705c59c097`, name "n8n", redirect host `localhost:5678`, registered by n8n on the first connect |

## Results

| Step | Result | Evidence |
| --- | --- | --- |
| Connect, pending client | ok, via the superadmin bypass | Discovery, registration and consent at 08:28 UTC; the client was still pending and the connecting user is a superadmin, so the grant was forced (mvp-connector ADR 0058) |
| Connect, approved client | ok, via the MCP credential only | The client was approved after the first connect. The Qonekto OAuth2 credential was not reconnected afterwards; the MCP connect below is the connect that ran against the approved client |
| Who Am I, OAuth2 | ok | Tenant `testmakler`, token named "n8n" |
| Kunde search dropdown, OAuth2 | ok | Search list loaded through the shared request helper |
| Add and Delete Customer Note, OAuth2 | ok | Note `9b3de8dda4` created, then deleted |
| Trigger activate and deactivate, OAuth2 | ok | n8n log: webhook added 09:18:14 UTC, removed 09:18:26 UTC, no errors |
| Refresh | ok | Who Am I at 09:39:08 UTC, 71 minutes after the only connect of this credential (08:28 UTC), so its first access token had expired. `whoami` reported type `oauth`, abilities `api-read api-full`, the client above, and `access_token_expires_at` 10:39:08 UTC — a new access token issued at the time of the call, without reconnecting. That n8n sends `resource` on refresh rests on its source (`createOAuth2ClientForRefresh`); the server accepts a refresh without it, so the run cannot show it |
| Who Am I, API token | ok | Token type `manual`; Base URL set by expression to review |
| Trigger activate and deactivate, API token | ok | |
| MCP Client node with an MCP OAuth2 API credential | ok | Server URL `https://review.qonekto.de/api/testmakler/mcp`; connected with the approved client, no new approval; tool `list-customers` returned 590 customers |
| Subtitle with OAuth2 selected | not checkable | n8n 2.37.10's canvas does not draw node subtitles, so there is nothing to see |

## Observations

- The first MCP connect attempt at 09:43:50 UTC logged "Protected resource discovery failed,
  assuming serverUrl is authorization server" and went on to build an authorization URL anyway; the
  second attempt eleven seconds later discovered the resource and connected. What differed between
  the two was not captured. It matches the README's wrong-tenant troubleshooting entry: n8n does not
  stop when discovery fails.
- Event delivery to the trigger was not exercised: review cannot reach a localhost n8n.
- Not exercised: a non-superadmin seeing the pending page, and an n8n older than 2.35.0.
