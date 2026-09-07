import { IDataObject, INodeExecutionData, INodeProperties, NodeOperationError } from 'n8n-workflow';
import {
	DeclarativeRestApiSettings,
	IExecutePaginationFunctions,
} from 'n8n-workflow/dist/esm/interfaces';

/**
 * A run-away Return All costs one billable API hit per page (every request is counted,
 * replays included — see EnsureWriteIdempotency in the connector), so an unfiltered list
 * of a large tenant is stopped rather than silently paged through. At the 100-per-page
 * size below this is 50,000 records, far past anything a workflow should be pulling in
 * one node.
 */
const MAX_PAGES = 500;

/** The page size requested when the user has not chosen one. 100 is the connector's cap. */
const DEFAULT_PAGE_SIZE = 100;

type PageInfo = { records: IDataObject[]; currentPage: number; lastPage: number };

/**
 * Reads whichever of the two paginated envelopes the response carries.
 *
 * The connector's own list endpoints answer with a Laravel paginator
 * (`{ data, links, meta: { current_page, last_page } }`). The Tasks and Claims endpoints
 * pass the upstream Ameise envelope through unchanged
 * (`{ items, currentPage, numberOfPages, numberOfResults }`).
 *
 * Returns null for anything else, which is how an endpoint that stops paginating — or a
 * Claims response whose shape we have never been able to observe, see
 * `docs/verification/`  — degrades to the single-page behaviour instead of misreading a
 * body it does not understand.
 */
function readPage(body: unknown): PageInfo | null {
	if (body === null || typeof body !== 'object') {
		return null;
	}
	const envelope = body as IDataObject;

	const meta = envelope.meta as IDataObject | undefined;
	if (Array.isArray(envelope.data) && typeof meta?.last_page === 'number') {
		return {
			records: envelope.data as IDataObject[],
			currentPage: typeof meta.current_page === 'number' ? meta.current_page : 1,
			lastPage: meta.last_page,
		};
	}

	if (Array.isArray(envelope.items) && typeof envelope.numberOfPages === 'number') {
		return {
			records: envelope.items as IDataObject[],
			currentPage: typeof envelope.currentPage === 'number' ? envelope.currentPage : 1,
			lastPage: envelope.numberOfPages,
		};
	}

	return null;
}

/**
 * Walks every page of a list operation and returns one item per record.
 *
 * Declared once as the node's `requestOperations.pagination`, so it runs for whichever
 * operation resolved `routing.send.paginate` truthy — that is, the one whose Return All
 * is on — and never for the others.
 *
 * `per_page` and `perPage` are both set because the two families of list endpoint spell
 * it differently and each ignores the other's spelling: Laravel reads only `per_page`,
 * and the passthrough controllers whitelist their query parameters
 * (`$request->only([...])`) so `per_page` is dropped before it reaches Ameise. Sending
 * both avoids having to keep a per-resource table in step with the operations.
 */
export async function paginateAllPages(
	this: IExecutePaginationFunctions,
	requestOptions: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	const query = (requestOptions.options.qs ??= {});
	if (query.per_page === undefined && query.perPage === undefined) {
		query.per_page = DEFAULT_PAGE_SIZE;
		query.perPage = DEFAULT_PAGE_SIZE;
	}

	// Whatever page the user asked to start on; Return All continues from there.
	let page = Number(query.page) > 0 ? Number(query.page) : 1;
	const results: INodeExecutionData[] = [];

	for (let requested = 0; requested < MAX_PAGES; requested++) {
		query.page = page;

		const items = await this.makeRoutingRequest(requestOptions);
		const info = readPage(items[0]?.json);
		if (info === null) {
			// Nothing to page through. Returning the response as-is keeps the operation
			// behaving exactly as it does with Return All off.
			return requested === 0 ? items : results;
		}

		results.push(...info.records.map((json) => ({ json })));

		if (info.currentPage >= info.lastPage) {
			return results;
		}
		page = info.currentPage + 1;
	}

	throw new NodeOperationError(
		this.getNode(),
		`Return All stopped after ${MAX_PAGES} pages without reaching the end of the list`,
		{
			description:
				'Narrow the result set with the search or filter fields, or turn Return All off and page through the list yourself.',
		},
	);
}

/**
 * The Return All toggle for a paginated list operation. The page size stays in the
 * operation's own Pagination Fields collection: set there it is honoured, left unset the
 * pagination above picks one.
 */
export const returnAllField = (resource: string, operation: string): INodeProperties => ({
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	// The wording is fixed by n8n-nodes-base/node-param-description-wrong-for-return-all;
	// what it means for this node goes in the hint.
	description: 'Whether to return all results or only up to a given limit',
	hint: 'On, every page is walked and one item is returned per record. Off, the operation returns a single item holding one page and its pagination metadata.',
	routing: {
		send: {
			paginate: '={{ $value }}',
		},
	},
	displayOptions: {
		show: {
			resource: [resource],
			operation: [operation],
		},
	},
});
