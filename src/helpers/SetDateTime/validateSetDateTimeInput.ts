import type { Error } from "src/@types";

const MS_IN_DAY = 86400000;
const MIN_DAY = 2;

/**
 * Validates the date input, and returns error if error is detected, else undefined
 *
 * @param start - the start date
 * @param end - the end date
 * @returns The error that is generated, undefined if none
 */
export const validateSetDateTimeInput = (start: Date, end: Date): Error | undefined => {
	if (start && end) {
		// eslint-disable-next-line no-undef-init -- eslint conflict for this specific case
		let error = undefined;
		const header = "Date Error";
		if (start.toUTCString() === end.toUTCString()) {
			error = { header, message: "Dates cannot be the same time" };
		} else if (start.getTime() > end.getTime()) {
			error = { header, message: "Start date must be less than end date" };
		} else if (end.getTime() - start.getTime() < MS_IN_DAY * MIN_DAY) {
			error = { header, message: "Start date must be 2 days away from end date" };
		}
		return error;
	}
	return { header: "Start and End date Invalid", message: "Start and End date must be valid values" };
};
