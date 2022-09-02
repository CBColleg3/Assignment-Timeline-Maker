import type { AssignmentDate } from "src/@types/AssignmentDate/AssignmentDate";
import { generateRandomColorHex } from "../shared/generateRandomColorHex";
import { isSameDay } from "../Task/isSameDay";

/**
 * Utility function for updating a date range contingent on whether the user decides to update the end or the start, the start will always
 * be less than the end, so we can always loop from start --> end and guarantee we will generate a range
 *
 * @param start - The start date
 * @param end - The end date
 * @param dates - The array of currently available dates
 * @returns the dates with an updated range added, if we have [1, 2, 5], we will get [1, 2, 3, 4, 5], without mutating the 1, 2, and 5 in the original array
 */
export const updateDateRange = (start: Date, end: Date, dates: AssignmentDate[]): AssignmentDate[] => {
	const datesClone = [...dates].map((eachDate) => ({
		...eachDate,
		date: new Date(eachDate.date.getTime()),
	}));
	const currentDay = new Date(start.getTime());
	while (currentDay.getTime() < end.getTime()) {
		if (!datesClone.some((eachDate) => isSameDay(eachDate.date, currentDay))) {
			datesClone.splice(datesClone.length - 1, 0, {
				color: generateRandomColorHex(),
				date: new Date(currentDay.getTime()),
				rank: datesClone.length - 1,
			});
		}
		currentDay.setDate(currentDay.getDate() + 1);
	}
	return datesClone;
};
