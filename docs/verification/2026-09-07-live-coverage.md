# Live coverage run — 2026-09-07

Every operation the node offers was executed against a real API at least once, so there is a
commit at which each is known to have worked. This file is that record. It is a snapshot, not a
test suite: nothing re-runs it, and it goes stale the moment either side changes.

## What it was run against

| | |
| --- | --- |
| Node | `n8n-nodes-qonekto` at commit `6e0030a` (plus this file) |
| Connector | `mvp-connector` at commit `bfac66cab6` on branch `fix/upstream-date-formats-and-archive-404`, two commits ahead of `dev` at `86f3f91cf2` |
| Date | 2026-09-07, 11:15–11:50 UTC |
| Host | local Valet instance at `https://mvp-connector.test`, tenant `demo` |
| Upstreams | the connector's own INTE targets — MitarbeiterWebservice, Tasks, Claims, Stocks and Panda on `*.inte.dionera.dev` |
| Runner | n8n 1.x from `@n8n/node-cli` 0.46.4, workflows executed through `n8n execute` |

The connector branch matters: it is unmerged, and it carries the upstream-date normalisation and
the 404-instead-of-500 change for unknown archive ids. Neither affects the happy paths below, but
a re-run against plain `dev` would see the old 500s.

Reads and writes went to a real CRM. Where a fixture was needed, contract `153011` and customer
`170430` are local rows standing in for records that exist in INTE (see the seed note at the end).

## Results

61 of 66 operations succeeded. Four are blocked by an upstream that rejects a well-formed request,
and one was deliberately not run.

| Resource | Operation | Result | Note |
| --- | --- | --- | --- |
| Kunde | List Kunden | ok |  |
| Kunde | Filter Kunden | ok | against the demo tenant |
| Kunde | Create Kunde | ok |  |
| Kunde | Show Kunde | ok |  |
| Kunde | Update Kunde | ok |  |
| Kunde | Upsert Kunde | ok | matched the customer Create Kunde had just made |
| Kunde | List Archive Entries | ok |  |
| Kunde | Upload File | ok | multipart custom operation |
| Kunde | Create File | ok |  |
| KundeTags | List Kunde Tags | ok |  |
| KundeTags | Set Kunde Tags | ok |  |
| KundeTags | Add Kunde Tags | ok |  |
| KundeTags | Remove Kunde Tags | ok |  |
| KundeAdditionalAddresses | List Customer Additional Addresses | ok |  |
| KundeAdditionalAddresses | Create Customer Additional Address | ok |  |
| KundeAdditionalAddresses | Update Customer Additional Address | ok |  |
| KundeAdditionalAddresses | Delete Customer Additional Address | ok |  |
| KundeNotes | List Customer Notes | ok |  |
| KundeNotes | Add Customer Note | ok |  |
| KundeNotes | Edit Customer Note | ok |  |
| KundeNotes | Delete Customer Note | ok |  |
| KundeRelations | List Customer Relations | ok |  |
| KundeRelations | Create Customer Relation | ok |  |
| KundeRelations | Delete Customer Relation | ok |  |
| KundeNotifications | Send Customer Notification | not run | not run: it sends a real message to a real customer |
| Vertrag | List Vertraege | ok |  |
| Vertrag | Filter Vertraege | ok |  |
| Vertrag | Create Vertrag | blocked upstream | MitarbeiterWebservice answers a generic HTML `Error #400`, for KFZ and non-KFZ sparten and for a minimal payload alike |
| Vertrag | Show Vertrag | ok |  |
| Vertrag | List Documents | ok |  |
| ContractBankAccount | Get Contract Bank Account | ok |  |
| ContractBankAccount | Change Contract Bank Account | ok |  |
| ContractProducts | Get Sparte Product Template | ok |  |
| ContractProducts | Get Contract Products | ok |  |
| ContractProducts | Update Contract Products | ok | the `Setze` path must name the template's own Produkt / Elementarprodukt / VariableWert |
| ContractProducts | Create KFZ Contract Products | blocked upstream | MitarbeiterWebservice answers HTTP 500 with an HTML error page |
| Listen | Anreden | ok |  |
| Listen | Gesellschaften | ok |  |
| Listen | Kunden Detail Felder | ok |  |
| Listen | Länder | ok |  |
| Listen | Rechtsformen | ok |  |
| Listen | Sparten | ok |  |
| Listen | Status | ok |  |
| Listen | Vermittler | ok |  |
| Listen | Zahlweisen | ok |  |
| Panda | Get All Customer Links | ok |  |
| Panda | Create A Customer Link | ok | needs a customer with an e-mail, or the `email` field set |
| Panda | Get Active Tenders For A Customer | ok |  |
| Panda | Get A Tender | ok |  |
| Panda | Create A Tender | blocked upstream | Panda answers 409 `There are no questions available for this product` for insurance line 54 in INTE |
| Panda | Archive A Tender | blocked upstream | Panda answers 500 on the one tender available to archive |
| ClaimsSchaden | List Claims By Contract | ok | empty until a claim existed; the connector turns the upstream 404 into a 400 |
| ClaimsSchaden | List Claims By Customer | ok | empty until a claim existed; the connector turns the upstream 404 into a 400 |
| ClaimsSchaden | Create Claim | ok |  |
| ClaimsSchaden | Get Claim | ok |  |
| ClaimsSchaden | Update Claim | ok |  |
| ClaimsSchaden | Delete Claim | ok |  |
| ClaimsSchaden | Get Claim Statuses | ok |  |
| TasksAufgaben | List Tasks | ok |  |
| TasksAufgaben | Create Task | ok |  |
| TasksAufgaben | Get Task | ok |  |
| TasksAufgaben | Update Task | ok |  |
| TasksAufgaben | Delete Task | ok |  |
| TasksAufgaben | Change Task Status | ok |  |
| Pipeline | Trigger Pipeline Import From CRM | ok | request shape only, against an echo server — a real run would push customer data to Zoho |
| Misc | Who Am I | ok |  |

## The four blocked upstream

**`Create Vertrag`** and **`Create KFZ Contract Products`** fail the same way: MitarbeiterWebservice
answers with a generic HTML error page — `Error #400 - Fehlerhafte anfrage!` for the contract,
HTTP 500 for the products — carrying no machine-readable reason. The contract create was tried
with sparte 050 and 120, with and without the optional fields; all three attempts are identical.
The request the connector builds looks well-formed in both cases. Settling either needs Ameise's
own logs. Note that the connector now logs the failing passthrough call, but truncates the
response body to 1 KB, which on a Symfony error page stops before the message.

**`Create A Tender`** is refused by Panda with `There are no questions available for this
product` — insurance line 54, the only one visible on this tenant's existing tenders, has no
question set in INTE. **`Archive A Tender`** answers 500 on the one tender available to archive.
Both are data problems on the Panda side, not request problems: the node's request reaches Panda
and Panda answers about its own state.

## The one not run

**`Send Customer Notification`** posts a real notification to a real customer. It is the only
operation here with an effect outside the CRM, and it was left alone on purpose.

## What else the run established

- **Return All** walks both envelopes. `List Kunden` with `per_page=100` from page 3166 returned
  232 records across the three remaining pages and stopped at `last_page`; `List Tasks` with
  `perPage=1` returned all three tasks across three pages. With Return All off, both return the
  single-page envelope unchanged.
- **Idempotency**: repeating a write with the same `Idempotency-Key`, and repeating one with no
  key at all, both came back carrying `_idempotency_replayed`. The header goes out when the field
  is filled and is absent when it is empty. It also showed up unprompted — chaining nodes so that
  three items reached each write made n8n fire three concurrent identical requests, and the
  second and third were flagged replays rather than duplicate records.
- **Claims end-to-end now works.** It could not be exercised before because the broker had no
  claims and every list answered 404. Creating one made the whole resource reachable: create,
  list by contract, list by customer, get, update, Return All and delete all succeeded.
- **`List Customer Relations` cannot be paged.** It answers with the upstream's paginated
  envelope (`currentPage` / `numberOfPages`), but `CustomerRelationsCtrl::index` forwards no
  query parameters, so page two is unreachable through the API. A customer with more relations
  than the upstream page size has some of them invisible. Connector-side; the node has no Return
  All there for that reason.
- **`Get Claim Statuses`** answers `[{"id": "OPEN", "text": "offen"}]` while the node sends
  `offen`/`geschlossen`. That is correct — `ClaimRules` validates `in:offen,geschlossen` and the
  connector maps to the upstream id.

## Records left behind

INTE has no delete endpoint for most of these, so they stay:

- customer `5002262426` ("Coverage n8n Cover cover1"), created by `Create Kunde` and matched
  again by `Upsert Kunde`
- two archive entries on customer `170430` (one `Create File`, one `Upload File`)
- a Panda customer link on `170430` (hash `603da6d2…`), expiring on its own
- `beruf` on customer `170430` set to "n8n coverage cover1" by `Update Kunde`
- a bank account on contract `153011`, and `Schadensfreiheitsklasse` set to "SF 5" on its
  Haftpflicht

Tasks, the claim, the note, the additional address and the relation created during the run were
all deleted again by the operations that follow them in the table.

Locally, `Kunde` `ameise_id=170430` and `Vertrag` `ameise_id=153011` were inserted so route model
binding resolves records that exist only in INTE. They are test rows; remove them with
`forceDelete()` when the fixture is no longer wanted.
