import type { Task } from "src/@types";

/**
 * Utility function for generating a new task
 *
 * @param color - color of the new task
 * @param dueDate - The date to set the new task
 * @param ind - the index of the new task, used for generating the name of the task
 * @param id - The id of the new task
 * @returns The new task generated from the input
 */
export const generateNewTask = (color: string, dueDate: Date, ind: number, id: number): Task => ({
	autoDueDate: false,
	color,
	description: `Make new task ${ind}, the description must be at least 20 characters long.`,
	dueDate,
	id,
	name: `New Task ${ind}`,
	points: 1,
});