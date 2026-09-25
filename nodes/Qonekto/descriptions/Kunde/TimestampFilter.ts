import {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	NodeOperationError,
} from 'n8n-workflow';

/**
 * The value grammar of the `kunde/filter` timestamp criteria, mirroring the connector's
 * `CustomerFilterRules::TIMESTAMP_FORMAT` (ADR 0062): a year, a month or a date (`-` or `/`,
 * the same one throughout), or a datetime to the minute or second with `T` or a space and
 * optional milliseconds or microseconds. Only a `T` datetime may carry `Z` or an offset.
 *
 * Laravel's `date_format` round-trips the value, so overflow such as `2024-13` or `T24:00` is
 * rejected there too; the calendar checks below reproduce that.
 */
const PERIOD = /^(\d{4})(?:([-/])(\d{2})(?:\2(\d{2}))?)?$/;
const INSTANT =
	/^(\d{4})-(\d{2})-(\d{2})(T| )(\d{2}):(\d{2})(?::(\d{2})(?:\.(?:\d{3}|\d{6}))?)?(Z|([+-])\d{2}:?(\d{2}))?$/;

function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function isCalendarDate(year: string, month: string, day?: string): boolean {
	const m = Number(month);
	if (m < 1 || m > 12) {
		return false;
	}
	if (day === undefined) {
		return true;
	}
	const days = [31, isLeapYear(Number(year)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	return Number(day) >= 1 && Number(day) <= days[m - 1];
}

function isTimestampFilterValue(value: string): boolean {
	const period = PERIOD.exec(value);
	if (period !== null) {
		return period[3] === undefined || isCalendarDate(period[1], period[3], period[4]);
	}

	const instant = INSTANT.exec(value);
	if (instant === null) {
		return false;
	}
	const [, year, month, day, separator, hour, minute, second, offset, sign, offsetMinute] =
		instant;
	if (offset !== undefined && separator !== 'T') {
		return false;
	}
	// PHP reads `-00:00` as +00:00 and writes it back that way, so the round trip fails.
	if (sign === '-' && /^-00:?00$/.test(offset)) {
		return false;
	}

	return (
		isCalendarDate(year, month, day) &&
		Number(hour) <= 23 &&
		Number(minute) <= 59 &&
		Number(second ?? 0) <= 59 &&
		Number(offsetMinute ?? 0) <= 59
	);
}

/**
 * Checks a timestamp filter before it is sent, so a malformed value fails on the node, naming
 * the field, instead of as a bare 422 from the API.
 */
export const validateTimestampFilter = (field: string) =>
	async function (
		this: IExecuteSingleFunctions,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const sent = (requestOptions.body as IDataObject | undefined)?.[field];
		// The API reads a blank value as no filter.
		if (sent === undefined || sent === null || sent === '') {
			return requestOptions;
		}
		// An expression can hand over a number or a DateTime; check the string the API receives.
		const value = typeof sent === 'string' ? sent : String(JSON.parse(JSON.stringify(sent)));
		if (!isTimestampFilterValue(value)) {
			throw new NodeOperationError(
				this.getNode(),
				`"${value}" is not a valid ${field} filter`,
				{
					itemIndex: this.getItemIndex(),
					description:
						'Use a year (2024), a month (2024-05), a date (2024-05-01) or an ISO 8601 time (2024-05-01T10:00:00+02:00).',
				},
			);
		}

		return requestOptions;
	};
