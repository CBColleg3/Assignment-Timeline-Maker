import type { Task } from "../../templates/task";

/**
 * This function calculates the day that a task should be completed on and returns a string
 * It calculates it by counting up until the index number given, and adding the sum for each arrayValue
 * and if the sum ever exceeds the pointsPerDay, then the Day goes up, rinse and repeat for all tasks.
 *
 * @param {Task[]} tasks array of tasks
 * @param {number} index current task function is on
 * @param {string} color current color of each task
 * @param {number} dayCounter Counter for days
 * @param {number} pointSum Summation of points
 * @param { number} totalDays totalDays given
 * @param {number} totalPoints totalPoints calculated
 * @param {Date} startDate The start date
 * @returns {string} The day that a task should be completed on
 */
export function calcDays(
	tasks: Task[],
	index: number,
	color: string,
	dayCounter: number,
	pointSum: number,
	totalDays: number,
	totalPoints: number,
	startDate: Date,
): { date: Date; color: string; updateCounter: boolean; updateSum: number } {
	const pointsPerDay: number = Math.ceil(totalPoints / totalDays);
	pointSum += +tasks[index].points;
	const surpassedPoints = pointSum >= pointsPerDay;
	const dayAssigned =
		startDate.getDate() + (surpassedPoints ? dayCounter++ : dayCounter);
	const newDate = new Date(
		startDate.getFullYear(),
		startDate.getMonth(),
		dayAssigned,
	);
	const newColor = (surpassedPoints ? color: color);
	return { date: newDate, color: newColor, updateCounter: surpassedPoints, updateSum: pointSum };
}
