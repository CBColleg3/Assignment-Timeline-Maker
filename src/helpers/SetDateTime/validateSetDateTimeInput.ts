import type { TimelineToast } from "src/@types";
import { generateErrorToast } from "../TimelineToast";

/**
 * # of milliseconds in day
 */
const MS_IN_DAY = 86400000;
/**
 * Minimum number of days start date can be behind end day
 */
const MIN_DAY = 2;

/**
 * Validates the date input, and returns error if error is detected, else undefined
 *
 * @param start - the start date
 * @param end - the end date
 * @returns The error that is generated, undefined if none
 */
export const validateSetDateTimeInput = (start: Date, end: Date): TimelineToast | undefined => {
	if (start && end) {
		// eslint-disable-next-line no-undef-init -- eslint conflict for this specific case
		let error: TimelineToast | undefined = undefined;
		const title = "Date Error";
		if (start.toUTCString() === end.toUTCString()) {
			error = { message: "Dates cannot be the same time", title, variant: "error" };
		} else if (start.getTime() > end.getTime()) {
			error = { message: "Start date must be less than end date", title, variant: "error" };
		} else if (end.getTime() - start.getTime() < MS_IN_DAY * MIN_DAY) {
			error = { message: "Start date must be 2 days away from end date", title, variant: "error" };
		}
		return error;
	}
	return generateErrorToast("Start and End date Invalid", "Start and End date must be valid values");
};
