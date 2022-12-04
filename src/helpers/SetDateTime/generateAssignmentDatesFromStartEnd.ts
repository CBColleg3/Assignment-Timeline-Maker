import type { AssignmentDate, iAssignmentDateInfoContextFormat } from "src/@types";
import { getMillisecondValueFromFormat } from "../AssignmentDateInfo";
import { generateRandomColorHex } from "../shared/generateRandomColorHex";

/**
 * Utility function for generating the range of dates from start to end
 *
 * @param start The start date
 * @param end The end date
 * @param exclusive Whether we include the ending date
 * @param format - The AssignmentDateFormat, which specifies how we are segmenting the tasks
 * @returns The range of dates from start to end
 */
export const generateAssignmentDatesFromStartEnd = (
	start?: AssignmentDate,
	end?: AssignmentDate,
	exclusive?: boolean,
	format: iAssignmentDateInfoContextFormat = "day",
): AssignmentDate[] => {
	if (start && end) {
		let currentDate: AssignmentDate = start;
		const range = [start];
		do {
			const { date } = currentDate;
			currentDate = {
				color: generateRandomColorHex(),
				date: new Date(date.getTime() + getMillisecondValueFromFormat(format)),
				rank: range.length,
			};
			range.push(currentDate);
		} while (
			Math.abs(currentDate.date.getTime() - end.date.getTime()) > getMillisecondValueFromFormat(format)
		);
		if (!exclusive) {
			range.push(end);
		}
		return range;
	}
	return [];
};
