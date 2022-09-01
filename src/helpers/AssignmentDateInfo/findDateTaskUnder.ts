import type { AssignmentDate } from "src/@types";
import { isSameDay } from "../Task/isSameDay";

/**
 * Function that takes in a task, and filters through the dates until it finds the date that the task falls under
 *
 * @param newDate - The date we are filtering for
 * @param dates - The dates we are filtering through
 * @param format - The date format we are going to use to find the millisecond value we are going to compare the task dueDate against the date's date.
 * @returns The assignment date that corresponds to the task
 */
export const findDateTaskUnder = (newDate: Date, dates: AssignmentDate[]): AssignmentDate => {
	const filteredResult = dates.filter((eachDate) => {
		const { date } = eachDate;
		return isSameDay(newDate, date);
	});
	return { ...filteredResult[0], color: filteredResult[0].color.substring(1) };
};
