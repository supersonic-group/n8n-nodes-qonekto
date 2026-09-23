import {
	IDataObject,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeProperties,
	INodePropertyOptions,
} from 'n8n-workflow';
import {
	IExecuteSingleFunctions,
	IN8nHttpFullResponse,
} from 'n8n-workflow/dist/esm/interfaces';

/**
 * Every write route on the Tenant API is wrapped in EnsureWriteIdempotency (connector
 * ADRs 0032–0036). Without a client key it derives one from tenant, token and request
 * body and keeps it for 60 seconds, which covers n8n's own retry envelope: a second
 * identical write inside that window is not performed, the first response is replayed,
 * and the node has no way to tell the two apart. The two halves below close that.
 */

/** Response header the connector sets on a replayed write. Node lowercases response headers. */
const REPLAYED_HEADER = 'idempotency-replayed';

/** Field added to a replayed write's output items. */
export const IDEMPOTENCY_REPLAYED_FLAG = '_idempotency_replayed';

/** Request header the connector reads a client-chosen key from. */
export const IDEMPOTENCY_KEY_HEADER = 'Idempotency-Key';

const KEY_PARAMETER = 'idempotencyKey';

/**
 * Custom operations do not go through declarative routing, so `Upload File` is named
 * here rather than derived below. It posts to the same idempotent
 * `POST /kunde/{id}/archiveintrag` route as `Create File`.
 */
const CUSTOM_WRITE_OPERATIONS = ['Upload File'];

/**
 * Marks the items of a write whose response the connector replayed rather than performed.
 *
 * Left unmarked, a workflow that retries — or that a user re-runs inside the 60 second
 * window — reports two successful writes for one record actually written.
 */
/** Whether the connector answered from its idempotency store instead of performing the write. */
export function isReplayedResponse(headers: IDataObject | undefined): boolean {
	return String(headers?.[REPLAYED_HEADER] ?? '') === 'true';
}

async function markIdempotentReplay(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (!isReplayedResponse(response.headers)) {
		return items;
	}

	return items.map((item) => ({
		...item,
		json: { ...(item.json as IDataObject), [IDEMPOTENCY_REPLAYED_FLAG]: true },
	}));
}

/**
 * Sends the user's Idempotency-Key, when they set one.
 *
 * A preSend rather than a routing header because an empty field must send no header at
 * all: with a key the connector honours it for 24 hours instead of the 60 second derived
 * window, so a workflow can make a write safe to replay across runs — but only if the key
 * is the caller's own, and an empty one would claim the same key for every request.
 */
async function sendIdempotencyKey(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const key = String(this.getNodeParameter(KEY_PARAMETER, '') ?? '').trim();
	if (key !== '') {
		requestOptions.headers = { ...requestOptions.headers, [IDEMPOTENCY_KEY_HEADER]: key };
	}

	return requestOptions;
}

/**
 * Whether an operation's request reaches a route carrying the idempotency middleware.
 *
 * Everything that is not a GET does, with one exception: the two `POST .../filter`
 * endpoints are reads spelled as POSTs and are deliberately left off the middleware in
 * the connector's route file. Deriving this from the operations themselves means a write
 * operation added later is covered without a second list to keep in step.
 */
function isIdempotentWrite(option: INodePropertyOptions): boolean {
	const request = option.routing?.request;
	if (request?.method === undefined || request.method === 'GET') {
		return false;
	}

	return !/\/filter$/.test(String(request.url ?? ''));
}

/** Every operation value whose request is idempotency-protected. */
function idempotentWriteOperations(operations: INodeProperties[]): string[] {
	const values = operations
		.flatMap((property) => property.options ?? [])
		.filter((option): option is INodePropertyOptions => 'value' in option)
		.filter(isIdempotentWrite)
		.map((option) => String(option.value));

	return [...values, ...CUSTOM_WRITE_OPERATIONS];
}

/** The operation selectors with the replay marker attached to every write they offer. */
export function withIdempotencyMarker(operations: INodeProperties[]): INodeProperties[] {
	return operations.map((property) => {
		if (property.options === undefined) {
			return property;
		}

		return {
			...property,
			options: property.options.map((option) => {
				if (!('value' in option) || !isIdempotentWrite(option)) {
					return option;
				}

				return {
					...option,
					routing: {
						...option.routing,
						output: {
							...option.routing?.output,
							postReceive: [
								...(option.routing?.output?.postReceive ?? []),
								markIdempotentReplay,
							],
						},
					},
				};
			}),
		};
	});
}

/** The optional Idempotency-Key field, shown on every write operation. */
export const idempotencyKeyField = (operations: INodeProperties[]): INodeProperties => ({
	displayName: 'Idempotency Key',
	name: KEY_PARAMETER,
	type: 'string',
	default: '',
	description:
		'A key of your own choosing that makes this write safe to repeat. Sending the same key with the same request again within 24 hours returns the first result instead of writing a second time, and the output carries `_idempotency_replayed`. Left empty, the API still protects against accidental repeats, but only for 60 seconds.',
	hint: 'Use a value that identifies the record, not the run — an order number rather than a timestamp',
	routing: {
		send: {
			preSend: [sendIdempotencyKey],
		},
	},
	displayOptions: {
		show: {
			operation: idempotentWriteOperations(operations),
		},
	},
});
