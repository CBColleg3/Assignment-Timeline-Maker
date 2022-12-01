import type { AssignmentDate } from "src/@types";
import { isSameDay } from "../Task/isSameDay";

/**
 * Function that takes in a task, and filters through the dates until it finds the date that the task falls under, guaranteed to at-least find one day the task falls under
 *
 * @param newDate - The date we are filtering for
 * @param dates - The dates we are filtering through
 * @returns The assignment date that corresponds to the task
 */
export const findDateTaskUnder = (newDate: Date, dates: AssignmentDate[]): AssignmentDate => {
	const filteredResult = dates.filter((eachDate) => {
		const { date } = eachDate;
		return isSameDay(newDate, date);
	});
	return { ...filteredResult[0], color: filteredResult[0].color.substring(1) };
};
