# n8n-nodes-qonekto

This is an n8n community node that lets you use the Qonekto API in your n8n workflows.

Qonekto provides an HTTP API for managing customers and related resources. This node wraps common endpoints so you can
automate tasks in n8n.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Resources](#resources)
[Version history](CHANGELOG.md)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community
nodes documentation.

## Operations

The Qonekto node exposes the following resources and operations. Paths are relative to
`{base_url}{tenant}`; IDs in paths are Ameise IDs.

- Claim
  - Create Claim — POST /vertrag/{vertrag_ameise_id}/schaden
  - Delete Claim — DELETE /schaden/{claimId}
  - Get Claim — GET /schaden/{claimId}
  - Get Claim Statuses — GET /schaden/statuses
  - List Claims By Contract — GET /vertrag/{vertrag_ameise_id}/schaden
  - List Claims By Customer — GET /kunde/{kunde_ameise_id}/schaden
  - Update Claim — PUT /schaden/{claimId}
- Contract
  - Create Contract — POST /vertrag
  - Filter Contracts — POST /vertrag/filter
  - Get Contract — GET /vertrag/{vertrag_ameise_id}
  - List Contracts — GET /vertrag
  - List Documents — GET /vertrag/{vertrag_ameise_id}/dokument
- Contract Bank Account
  - Get Contract Bank Account — GET /vertrag/{vertrag_ameise_id}/bank-account
  - Change Contract Bank Account — PUT /vertrag/{vertrag_ameise_id}/bank-account
- Contract Product
  - Get Division Product Template — GET /sparte/{sparte_ameise_id}/produkttemplate
  - Get Contract Products — GET /vertrag/{vertrag_ameise_id}/produkte
  - Update Contract Products — PATCH /vertrag/{vertrag_ameise_id}/produkte
  - Create Motor Vehicle Contract Products — PUT /vertrag/{vertrag_ameise_id}/produkte
- Customer
  - Create Customer — POST /kunde
  - Create File — POST /kunde/{kunde_ameise_id}/archiveintrag
  - Create or Update Customer — PUT /kunde/upsert
  - Filter Customers — POST /kunde/filter
  - Get Customer — GET /kunde/{kunde_ameise_id}
  - List Archive Entries — GET /kunde/{kunde_ameise_id}/archiveintrag
  - List Customers — GET /kunde
  - Update Customer — PUT /kunde/{kunde_ameise_id}
  - Upload File — POST /kunde/{kunde_ameise_id}/archiveintrag
- Customer Additional Address
  - List Customer Additional Addresses — GET /kunde/{kunde_ameise_id}/additional-addresses
  - Create Customer Additional Address — POST /kunde/{kunde_ameise_id}/additional-addresses
  - Update Customer Additional Address — PUT /kunde/{kunde_ameise_id}/additional-addresses/{address}
  - Delete Customer Additional Address — DELETE /kunde/{kunde_ameise_id}/additional-addresses/{address}
- Customer Note
  - List Customer Notes — GET /kunde/{kunde_ameise_id}/notes
  - Add Customer Note — POST /kunde/{kunde_ameise_id}/notes
  - Edit Customer Note — PUT /kunde/{kunde_ameise_id}/notes/{note}
  - Delete Customer Note — DELETE /kunde/{kunde_ameise_id}/notes/{note}
- Customer Notification
  - Send Customer Notification — POST /kunde/{kunde_ameise_id}/notifications
- Customer Relation
  - List Customer Relations — GET /kunde/{kunde_ameise_id}/relations
  - Create Customer Relation — POST /kunde/{kunde_ameise_id}/relations
  - Delete Customer Relation — DELETE /kunde/{kunde_ameise_id}/relations/{relatedKunde}
- Customer Tag
  - List Customer Tags — GET /kunde/{kunde_ameise_id}/tags
  - Set Customer Tags — PUT /kunde/{kunde_ameise_id}/tags
  - Add Customer Tags — POST /kunde/{kunde_ameise_id}/tags
  - Remove Customer Tags — DELETE /kunde/{kunde_ameise_id}/tags
- Lookup List
  - List Brokers — GET /vermittler
  - List Countries — GET /laender
  - List Customer Detail Fields — GET /kunden_detail_felder
  - List Divisions — GET /sparten
  - List Insurers — GET /gesellschaften
  - List Legal Forms — GET /rechtsformen
  - List Payment Methods — GET /zahlweisen
  - List Salutations — GET /anreden
  - List Statuses — GET /status
- Misc
  - Who Am I — GET /whoami
- Panda
  - Archive A Tender — POST /panda/tenders/{tenderId}/archive
  - Create A Customer Link — POST /panda/customer-links
  - Create A Tender — POST /panda/tenders
  - Get A Tender — GET /panda/tenders/{tenderId}
  - Get Active Tenders For A Customer — GET /panda/tenders
  - Get All Customer Links — GET /panda/customer-links
- Pipeline
  - Trigger Pipeline Import From CRM — GET /pipeline/{pipeline_id}/trigger-from-crm
- Task
  - Change Task Status — PATCH /aufgabe/{taskId}/status
  - Create Task — POST /aufgabe
  - Delete Task — DELETE /aufgabe/{taskId}
  - Get Task — GET /aufgabe/{taskId}
  - List Tasks — GET /aufgabe
  - Update Task — PUT /aufgabe/{taskId}

### Qonekto Trigger

Starts a workflow when Qonekto reports an event. Pick an action (Created, Updated, Deleted, Archive Entry
Created) and a subject type (Customer, Contract, Broker, …); activating the workflow registers a webhook
with Qonekto and deactivating it removes the webhook again. Not every pair is supported; the node's Action
description lists which are.

Note: The exact input fields for each operation are provided in the node’s parameters within n8n (see the Fields panel
when configuring the node).

## Credentials

Both nodes authenticate with either an API token or OAuth2, chosen with the node's Authentication parameter. API Token
is the default, so existing workflows keep working unchanged.

### API Token

This credential uses a bearer token, a tenant identifier, and a selectable base URL to authenticate against the
Qonekto API.

- API Token (required): Used as a Bearer token for the Authorization header.
- Tenant (required): Your Qonekto tenant identifier used to build the base URL.
- Base URL (required): The API host to use. Currently available option: Production (https://app.qonekto.de/api/).

Behavior

- Effective Base URL: {base_url}{tenant}
- Credential Test: The credential test performs a request to GET /whoami to verify access.

How to obtain credentials

- Visit the Admin > API Tokens page in your Qonekto backend
- Create a new Token and enter a corresponding name, for example "n8n automation"

Security

- n8n stores credentials securely. Avoid hardcoding tokens; configure them via n8n’s Credentials UI.

### OAuth2

The Qonekto OAuth2 API credential signs you in to Qonekto instead of using a pasted token. There is no client ID or
secret to enter: n8n registers itself with Qonekto on connect and uses PKCE.

- Tenant (required): Your Qonekto tenant identifier.
- Base URL (required): The API host. Currently available option: Production (https://app.qonekto.de/api/).

Requirements

- n8n 2.35.0 or later. It fixed token refresh for self-registering OAuth2 credentials; on older versions a
  credential may stop working after the first hour.
- n8n's public URL must use HTTPS (or be a loopback address such as `localhost`), because Qonekto only accepts such
  redirect URLs. Behind a reverse proxy, set `N8N_EDITOR_BASE_URL` (or `WEBHOOK_URL`) to the public HTTPS address.

How to connect

1. Create a Qonekto OAuth2 API credential, enter tenant and base URL, and click Connect my account.
2. The first connect from a new n8n instance registers it with Qonekto. Until Qonekto support has approved it, the
   sign-in page says the application is "noch nicht freigegeben" (not yet approved). Ask Qonekto support to approve the client named
   "n8n" with your n8n host, then click Connect again.
3. Sign in to Qonekto and grant access. Keep full access (`api-full`): with read-only access, every write operation
   and activating a Qonekto Trigger fail with "Invalid ability provided." To fix a read-only grant, reconnect and grant
   full access.

Each instance is approved once; further credentials, for other tenants too, need no new approval.

Troubleshooting

- "The resource parameter must name a tenant MCP or API URL" in n8n's connect window after sign-in: n8n could not
  build your tenant's URL. Check the tenant identifier, and that a Base URL set by expression ends with a slash
  (`https://…/api/`). n8n still registers in that case, which counts against the limit below.
- Moving n8n to another host registers a new client, which needs approval again.
- Registration runs on every Connect click and is limited to 10 per hour per IP address.
- A credential unused for 30 days loses its refresh token and must be reconnected.

MCP

The Qonekto nodes do not use MCP. To use Qonekto's MCP server from n8n, use n8n's built-in MCP Client Tool node with an
MCP OAuth2 API credential whose server URL is your tenant's MCP URL, `https://app.qonekto.de/api/{tenant}/mcp`. It
registers and connects the same way; that connection is separate from the one the Qonekto nodes use.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Qonekto API Docs](https://app.qonekto.de/api/docs/)
- Repository: https://github.com/supersonic-group/n8n-nodes-qonekto
- Issues: https://github.com/supersonic-group/n8n-nodes-qonekto/issues
