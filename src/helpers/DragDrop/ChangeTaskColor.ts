import type { Task } from "src/@types";

const INDEX_ONE = 1;
const INDEX_ZERO = 0;

/**
 *
 * @param modifiedTasks
 * @param index
 */
export const ChangeTaskColor = (movedTasks: Task[], index: number): Task[] => {
	if (
		movedTasks[index].dueDate.toDateString() !== movedTasks[index - INDEX_ONE].dueDate.toDateString() &&
		index !== INDEX_ZERO
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
