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
		style["background-color"] = `rgb(${
			parseInt(task.color ? task.color.substring(0, 2) : "ff", 16) + 100
		},100,150)`;
	}

	return style;
};
