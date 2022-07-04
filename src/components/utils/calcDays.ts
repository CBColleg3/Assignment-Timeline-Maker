import type { Task } from "../../interfaces/task";

/**
 * This function calculates the day that a task should be completed on and returns a string
 * It calculates it by counting up until the index number given, and adding the sum for each arrayValue
 * and if the sum ever exceeds the pointsPerDay, then the Day goes up, rinse and repeat for all tasks.
 *
 * @param {Task[]} tasks array of tasks
 * @param {number} index current task function is on
 * @param { number} totalDays totalDays given
 * @param {number} totalPoints totalPoints calculated
 * @returns {string} The day that a task should be completed on
 */
export function calcDays(
	tasks: Task[],
	index: number,
	totalDays: number,
	totalPoints: number,
): string {
	let dayCount = 1;
	let daySum = 0;
	const pointsPerDay = Math.ceil(totalPoints / totalDays);
	const dayArray: number[] = tasks.map((task) => +task.points);
	for (let i = 0; i <= index; i++) {
		daySum += dayArray[i];
		if (daySum >= pointsPerDay) {
			dayCount++;
			daySum = 0;
		}
	}
	return "Day " + dayCount.toString();
}
