import type { Error, AssignmentDate } from "src/@types";

/**
 * Validates the date input, and returns error if error is detected, else undefined
 *
 * @param assignmentDate The assignment date to validate the input with
 * @returns The error that is generated, undefined if none
 */
export const validateSetDateTimeInput = (assignmentDate: AssignmentDate): Error | undefined => {
	const { start, end } = assignmentDate;
	// eslint-disable-next-line no-undef-init -- eslint conflict for this specific case
	let error = undefined;
	const header = "Date Error";
	if (start.toUTCString() === end.toUTCString()) {
		error = { header, message: "Dates cannot be the same time" };
	} else if (start.getTime() > end.getTime()) {
		error = { header, message: "Start date must be less than end date" };
	}
	return error;
};
