import type { Task } from "src/@types";

/**
 * This function calculates the total amount of points in the document
 *
 * @param {Task[]} tasks array of tasks state
 * @returns {number} total points in the document
 */
export function calcTotalPoints(tasks: Task[]): number {
	let total = 0;
	for (const task of tasks) {
		total += task.points;
	}
	return total;
}
