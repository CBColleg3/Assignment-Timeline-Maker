import type { Task } from "../@types/Task";

const IS_SURPASSED_INC = 1;

const IS_NOT_SURPASSED_INC = 0;

/**
 * This function calculates the day that a task should be completed on and returns a string
 * It calculates it by counting up until the index number given, and adding the sum for each arrayValue
 * and if the sum ever exceeds the pointsPerDay, then the Day goes up, rinse and repeat for all tasks.
 *
 * @param {Task[]} tasks array of tasks
 * @param {number} index current task function is on
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
	dayCounter: number,
	pointSum: number,
	totalDays: number,
	totalPoints: number,
	startDate: Date,
): { date: Date; updateCounter: boolean; updateSum: number } {
	const newPointSum = pointSum + +tasks[index].points;

	const pointsPerDay: number = Math.ceil(totalPoints / totalDays);
	const overPoints = newPointSum >= pointsPerDay;

	const newDayCounter =
		dayCounter +
		(overPoints ? dayCounter + IS_SURPASSED_INC : IS_NOT_SURPASSED_INC);
	const dayAssigned = startDate.getDate() + newDayCounter;

	const newDate = new Date(
		startDate.getFullYear(),
		startDate.getMonth(),
		dayAssigned,
	);
	return {
		date: newDate,
		updateCounter: overPoints,
		updateSum: newPointSum,
	};
}
