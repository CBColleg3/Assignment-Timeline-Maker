import type { Task } from "../../templates/task";

/**
 * This function calculates the total amount of points in the document
 * 
 * @param {Task[]} tasks array of tasks state
 * @returns {number} total points in the document
 */
export function calcTotalPoints(tasks: Task[]): number {
	let total = 0;
	for (let i = 0; i < tasks.length; i++) {
		total += parseInt(tasks[i].points, 10);
	}
	return total;
}
