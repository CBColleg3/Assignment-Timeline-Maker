import type { iAssignmentDateInfoContextFormat, Task } from "src/@types";
import { isSameFuncGenerator } from "../Task";

/**
 * Determines whether any task within the tasks array contains the date supplied as the first argument
 *
 * @param date - The date to apply to filtering every task
 * @param tasks - The array of tasks to determine if any task has a date that matches the date supplied
 * @param format - The AssignmentDateFormat, specifying whether to apply the matching function for days, hours, minutes
 * @returns If any task matches the date supplied in the first argument
 */
export const doesDateContainTasks = (
	date: Date,
	tasks: Task[],
	format: iAssignmentDateInfoContextFormat,
): boolean => tasks.some((eachTask: Task) => isSameFuncGenerator(format)(date, eachTask.dueDate));
