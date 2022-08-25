import type { AssignmentDate } from "src/@types";
import { generateRandomColorHex } from "../shared/generateRandomColorHex";

const MS_IN_DAY = 86400000;

/**
 * Utility function for generating the range of dates from start to end
 *
 * @param start The start date
 * @param end The end date
 * @param exclusive Whether we include the ending date
 * @returns The range of dates from start to end
 */
export const generateAssignmentDatesFromStartEnd = (
	start?: AssignmentDate,
	end?: AssignmentDate,
	exclusive?: boolean,
): AssignmentDate[] => {
	if (start && end) {
		let currentDate: AssignmentDate = start;
		const range = [start];
		do {
			const { date, rank } = currentDate;
			currentDate = {
				color: generateRandomColorHex(),
				date: new Date(date.getTime() + MS_IN_DAY),
				rank: range.length,
			};
			range.push(currentDate);
		} while (Math.abs(currentDate.date.getTime() - end.date.getTime()) < MS_IN_DAY);
		if (!exclusive) {
			range.push(end);
		}
		return range;
	}
	return [];
};
