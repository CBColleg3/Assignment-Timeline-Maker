/* eslint-disable @typescript-eslint/no-magic-numbers -- no outstanding magic numbers */
import type { Task } from "src/@types";

/**
 *
 * @param {string} textContent textContent of the entire paragraph
 * @param {Task[]} taskArray The array of tasks
 * @returns The highlighting style to apply to the elements
 */
export const highlightTask = (textContent: string, taskArray: Task[]): Record<string, string> => {
	const style: Record<string, string> = {};

	const task = taskArray.find((eachTask: Task): boolean => eachTask.document.includes(textContent));
	if (task !== undefined) {
		style.backgroundColor = `#${task.color}`;
	}

	return style;
};
