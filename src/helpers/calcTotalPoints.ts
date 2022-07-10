import type { Task } from "../@types/Task";

/**
 * This function calculates the total amount of points in the document
 *
 * @param {Task[]} tasks array of tasks state
 * @returns {number} total points in the document
 */
export function calcTotalPoints(tasks: Task[]): number {
	let total = 0;
	for (const task of tasks) {
		total += parseInt(task.points, 10);
	}
	return total;
}
