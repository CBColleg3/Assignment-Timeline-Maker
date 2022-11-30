import type { Task } from "src/@types";

const INDEX_ONE = 1;
const INDEX_ZERO = 0;

/**
 * Changes the Color and Due Date of a Task if it's moved near another task with a different due date. It first checks the one above it
 * but if its at the top it checks the one below it to match its due date and color.
 * 
 * @param movedTasks the task array to modify.
 * @param index the index of the task we've moved.
 * @returns a modified task array with the due dates and colors updated
 */
export const changeTaskColor = (movedTasks: Task[], index: number): Task[] => {
	if (
		movedTasks[index].dueDate.toDateString() !== movedTasks[index - INDEX_ONE].dueDate.toDateString() &&
		index !== INDEX_ZERO && movedTasks[index].dueDate.toDateString() !== movedTasks[index + INDEX_ONE].dueDate.toDateString() && 
		index !== movedTasks.length - INDEX_ONE
	) {
		movedTasks[index].dueDate = movedTasks[index - INDEX_ONE].dueDate;
		movedTasks[index].color = movedTasks[index - INDEX_ONE].color;
	} else if (
		index === INDEX_ZERO &&
		movedTasks[index].dueDate.toDateString() !== movedTasks[index + INDEX_ONE].dueDate.toDateString()
	) {
		movedTasks[index].dueDate = movedTasks[index + INDEX_ONE].dueDate;
		movedTasks[index].color = movedTasks[index + INDEX_ONE].color;
	}

	return movedTasks;
};
