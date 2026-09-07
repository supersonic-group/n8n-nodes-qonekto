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

**`Create Vertrag`** cannot succeed on this tenant at all, and the reason is fixture data rather
than anything either repo does wrong. See the second follow-up below for the working.

**`Create KFZ Contract Products`** draws HTTP 500 from MitarbeiterWebservice. Re-run after the
connector's log-truncation fix landed, the whole of what the upstream says is

    Whoops, da ist wohl etwas schief gegangen.

— a generic Symfony 500 page. There is no validation message to extract because it is not a
validation failure: something throws server-side. Nothing further can be learned from this end,
and it needs Ameise's own logs.

The request is not in doubt. The logged body is

```json
{"Halter":{"Beziehungswert":1,"Vorname":"…","Nachname":"…","Strasse":"…","PLZ":"40213",
 "Ort":"Duesseldorf","Geburtsdatum":632361600,"Geschlecht":1,"Personentyp":1}}
```

which is the documented shape, with `Geburtsdatum` correctly converted to epoch seconds
(632361600 is 1990-01-15T00:00:00Z) by `ContractProductsService::createKfz()` — so the node's
date handling reaches the wire intact.

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
- **`List Customer Relations` could not be paged** at the time of the run — see the follow-up
  below, which resolves it.
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

## Follow-up, same day

`List Customer Relations` was reported as unpageable above. It has since been fixed
connector-side and re-verified here.

`CustomerRelationsCtrl::index` now whitelists `page` and `pageSize` and the service reads the
non-deprecated `v1/customers/{id}/relations` path, which actually paginates; the legacy path it
replaced ignored every pagination parameter it was given. The v1 item shape is translated back
to the old one, and a field-by-field comparison of the run above against the re-run confirms
nothing the node reads moved — same keys on the item and on `relatedCustomer`, same
`mainAddress.nation` values, with `brokerId` and `status` added.

Two things worth carrying forward. The parameter is **`pageSize`**: the endpoint silently ignores
`perPage` and answers `numberOfPages: 1` with every record in it, which is why it read as
"paginated but only ever one page" for so long. And the operation now has a Return All toggle,
verified against a customer with five relations at `pageSize=2` — three pages walked, five
records returned, and the same call with Return All off still returning the single-page envelope.

Connector commit: `ce01a4c0`, on the same unmerged branch as the rest.

## Second follow-up: why Create Vertrag cannot pass

Recorded above as an opaque upstream rejection. It is not opaque; it is a fixture mismatch, and
it is invisible from either side on its own.

The connector validates `vermittler_id` against the tenant's local `ameise_vermittler` table.
On `demo` that table holds 737 rows and **every one of them ends in `B51E`**. Meanwhile the
Ameise employee the connector pushes contracts through is `03A71H_XDSJKU`, the tenant's
`ameise_vermittler_id` is `03A71H`, and every real contract read back from INTE carries
`Vermittler: 03A71H`. The two id spaces do not intersect anywhere:

| Sent | Passes connector validation | Ameise verdict |
| --- | --- | --- |
| `07B51E` (and any other local row) | yes | generic HTML `Error #400 - Fehlerhafte anfrage!` — the employee does not own that vermittler |
| `03A71H` (what the employee owns) | **no** — `Der gewählte Wert für Vermittlernummer ist ungültig.` | never reached |

So there is no value that clears both gates, and the operation is unreachable on this tenant
regardless of what the node sends. The local broker hierarchy and the tenant's Ameise identity
are from different brokers.

The node is not implicated: the payload the connector built from its request is complete and
well-formed, captured from the failing call as

```json
{"Status":"F","Gesellschaft":"55150","Vermittler":"07B51E","Kunde":170430,"Sparte":"050",
 "Beitrag":{"Zahlweise":1,"Brutto":14.68,"Netto":12.34,"Steuer":19},
 "Laufzeit":{"Beginn":"2026-01-01"},"Risiko":"…","Versicherungsscheinnummer":"…",
 "Adresse":"0","Bankkonto":{"IBAN":"","BIC":"","Bankname":"","Inhaber":{"Abweichend":false}}}
```

Only the one field's value is wrong, and it is wrong because the data it must be chosen from is.

Two things fall out of this that are worth acting on, neither of them the node's:

- **Nothing checks the vermittler against the token's own hierarchy before pushing.** A value
  that is locally valid but not owned by the employee produces a generic HTML 400 from Ameise
  naming no field. A pre-flight check would turn that into a 422 naming `vermittler_id`, which
  is the difference between this taking ten minutes and taking a day.
- **The demo tenant cannot exercise contract creation.** Proving that path end-to-end needs
  either a tenant whose local vermittler data matches its Ameise identity, or a `03A71H` row
  seeded into `ameise_vermittler` — not attempted here, because `Vermittler` is
  `IsConnectedToCrm` and pushing an invented broker upstream is a worse outcome than an
  unexercised operation.

Verified 2026-09-07 12:21–12:30 UTC against connector `ce01a4c0`, with `vermittler_id` set to
`03A71H` and with the full and minimal optional sets; both attempts fail identically at the
connector's own validation.
