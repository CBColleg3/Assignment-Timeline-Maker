import type { AssignmentDate, Task } from "src/@types";
import type { iAssignmentDateInfoContextFormat } from "src/@types/AssignmentDate/iAssignmentDateInfoContextFormat";
import { isSameDay } from "../Task/isSameDay";
import { getMillisecondValueFromFormat } from "./getMillisecondValueFromFormat";

/**
 * Function that takes in a task, and filters through the dates until it finds the date that the task falls under
 *
 * @param task - The task we are filtering for
 * @param dates - The dates we are filtering through
 * @param format - The date format we are going to use to find the millisecond value we are going to compare the task dueDate against the date's date.
 * @returns The assignment date that corresponds to the task
 */
export const findDateTaskUnder = (task: Task, dates: AssignmentDate[]): AssignmentDate => {
	const { dueDate } = task;
	const filteredResult = dates.filter((eachDate) => {
		const { date } = eachDate;
		return isSameDay(dueDate, date);
	});
	return filteredResult[0];
};
