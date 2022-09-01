import type { Task } from "src/@types";

/**
 * Utility function for generating a new task
 *
 * @param color - color of the new task
 * @param ind - the index of the new task, used for generating the name of the task
 * @param id - The id of the new task
 * @param dueDate -
 * @returns The new task generated from the input
 */
export const generateNewTask = (color: string, dueDate: Date, ind: number, id: number): Task => ({
	autoDueDate: false,
	color,
	description: `Make new task ${ind}`,
	dueDate,
	id,
	name: `New Task ${ind}`,
	points: 1,
});
