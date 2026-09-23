/**
 * Routing values shared across resources.
 */

/**
 * Renders a date-only field as the calendar date it was written as.
 *
 * The obvious `(new Date($value)).toDateTime().format('yyyy-MM-dd')` resolves the
 * value in the instance's timezone (GENERIC_TIMEZONE, which defaults to
 * America/New_York), so a UTC-midnight value — what the date picker produces —
 * formats as the *previous* day on any instance behind UTC. Every date the node
 * sent was a day early there.
 *
 * Parsing with `setZone` keeps whatever offset the value already carries and
 * formats that, so the date the user picked is the date the API receives, on any
 * instance. `.toUTC()` alone is not enough: it fixes UTC-midnight but still shifts
 * an ISO string carrying a non-UTC offset.
 *
 * The fallback covers values that are not ISO strings — epoch numbers and Date
 * objects, which an expression-fed field can produce.
 *
 * Use this for date-only fields. A field that means a genuine instant (an ATOM
 * timestamp, say) wants a UTC conversion instead, not this.
 */
export const DATE_ONLY_VALUE =
	'={{ $value ? (DateTime.fromISO(String($value), { setZone: true }).isValid ? DateTime.fromISO(String($value), { setZone: true }).toFormat("yyyy-MM-dd") : DateTime.fromJSDate(new Date($value)).toUTC().toFormat("yyyy-MM-dd")) : null }}';

/**
 * Renders an instant as an ATOM timestamp, which is what `date_format:ATOM`
 * (`Y-m-d\TH:i:sP`) accepts.
 *
 * The previous `new Date($value).toISOString().replace('.000Z', '+00:00')` only
 * worked when the value landed on an exact second: any other value keeps its
 * milliseconds and a `Z` suffix, and ATOM rejects both, so the write 422s.
 * Formatting explicitly drops the milliseconds and emits a real `+00:00` offset.
 *
 * Unlike DATE_ONLY_VALUE this converts to UTC on purpose — the field means a
 * point in time, not a calendar date, so the instant is what matters.
 */
export const ATOM_TIMESTAMP_VALUE =
	"={{ $value ? DateTime.fromJSDate(new Date($value)).toUTC().toFormat(\"yyyy-MM-dd'T'HH:mm:ssZZ\") : null }}";

/**
 * Renders a date-time as ISO 8601 with an explicit offset, keeping the wall-clock
 * the value already carries.
 *
 * The upstream Tasks API accepts only this shape. Verified against INTE: a bare
 * `2026-03-05` and a `...Z`-suffixed value both come back as
 * `dueDate: ["This value should be of type string."]`, while
 * `2026-03-05T00:00:00+00:00` is accepted. So a task due date cannot use
 * DATE_ONLY_VALUE even though the user picks a calendar date.
 *
 * Unlike ATOM_TIMESTAMP_VALUE this deliberately does NOT convert to UTC: a due
 * date picked as the 5th in Berlin would become the 4th at 23:00 in UTC, which is
 * the same off-by-one this module exists to prevent. Keeping the offset preserves
 * the date the user chose.
 */
export const DATETIME_WITH_OFFSET_VALUE =
	'={{ $value ? (DateTime.fromISO(String($value), { setZone: true }).isValid ? DateTime.fromISO(String($value), { setZone: true }).toFormat("yyyy-MM-dd\'T\'HH:mm:ssZZ") : DateTime.fromJSDate(new Date($value)).toUTC().toFormat("yyyy-MM-dd\'T\'HH:mm:ssZZ")) : null }}';
