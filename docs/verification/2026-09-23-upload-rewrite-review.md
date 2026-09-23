# Upload File rewrite on review — 2026-09-23

Upload File stopped using `form-data` (n8n Cloud forbids the import) and now encodes its multipart
body itself. This run checks that uploads still reach Qonekto intact, with both credentials, before
the release that ships the change. It is a snapshot, not a test suite. The unit tests in `test/`
cover the request shape; this is the only record that the API accepts it.

## What it was run against

| | |
| --- | --- |
| Node | `n8n-nodes-qonekto` on branch `fix/upload-file-optional-fields` at `8d091a6`, plus the example workflows and this file |
| Connector | `https://review.qonekto.de`, tenant `testmakler` |
| Date | 2026-09-23, 13:20–13:30 UTC |
| Runner | n8n 2.40.5 via `npx n8n execute` against the `n8n-node dev` user folder (`~/.n8n-node-cli`) |
| Credentials | "review qonekto api token" (`qonektoApi`) and "review qonekto oauth" (`qonektoOAuth2Api`) |
| Customer | `5002352953` |

## Results

| Step | Result | Evidence |
| --- | --- | --- |
| Upload File, API token, every optional field | ok | Entry `bf87fec5df0dd7620124`: `Typ: dokument`; subject fell back to the filename `Prüfbericht Größe.pdf`; date `2026-09-23T10:15:00`; linked to division `010`; tags `n8n-verify`, `Prüfung` |
| Same upload, item without a file, continue on fail | ok | Error item: "This operation expects the node's input data to contain a binary file 'data', but none was found [item 1]"; the other item still uploaded |
| Upload File, OAuth2 | ok | Entry `f3dc7ee63d2c19554792`, subject as set, date defaulted to the upload time |
| List Archive Entries reads both back | ok | Both entries listed with the division link and tags above |
| Content round trip | ok | The token upload downloaded through its signed `download_url` in n8n: 55 bytes sent, 55 received, `Buffer.compare` equal |
| Example `upload-document-to-customer.json` | ok | Entry `8ca6f2b8d75235bed885`, tags `n8n`, `policy`, metadata `_kundensichtbar` (visible to the customer) |
| Example `note-on-new-customer.json`, note node | ok | Note `f8ce0f7bd9` added from a stand-in trigger item carrying `subject_id`, then deleted |

## What the run and the tests before it found

The unit tests written for this run failed on three Upload File defects. All three were fixed
before the run above:

- **`Typ` instead of `typ`.** n8n's lint autofix title-cases the `name` of any `{ name, value }`
  literal it takes for an option, and the first multipart part was written as one. Every upload
  from the unreleased rewrite would have sent `Typ`. Parts now use a `field` key.
- **Tags from Optional Fields were never sent.** The operation read `optional.tagsJson`, a key the
  collection never had. This has been broken since the fields moved into the collection
  (`5781797`, 2026-02-04). 2.1.1 is affected.
- **The division was sent as the locator object.** Division ID is a resource locator. The old code
  passed the object to `form-data`; the new encoder turned it into `[object Object]`. Division
  links on uploads never worked before this fix.

## Not exercised

- The trigger's webhook lifecycle. Its error paths are covered by `test/trigger.test.js`; the happy
  path ran on review earlier today (see the OAuth2 record) with unchanged request code.
- The Customer search dropdown against the API. The paging change is covered by
  `test/list-search.test.js`, and the request itself did not change.

## Records left behind

On review, customer `5002352953` keeps three archive entries (`bf87fec5df0dd7620124`,
`f3dc7ee63d2c19554792`, `8ca6f2b8d75235bed885`); the API has no delete for them. The note was
deleted. In the dev n8n, the `qonekto verify: *` workflows remain and can be deleted.
