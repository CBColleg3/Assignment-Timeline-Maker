import type { Task } from "../@types/Task";
import type { CalculateDayPayload, CalculateDayResponse } from "./updateDueDates";

/**
 * Minimum total value
 */
const MIN_TOTAL = 0;

/**
 * This function calculates the day that a task should be completed on and returns a string
 * - It calculates it by counting up until the index number given, and adding the sum for each arrayValue
 * and if the sum ever exceeds the pointsPerDay, then the Day goes up, rinse and repeat for all tasks.
 *
 * @param currentTask The current task being evaluated
 * @param payload The details that determine whether to increment the date or not
 * @returns Whether to update the date, and the amount
 */
export const calcDays = (currentTask: Task, payload: CalculateDayPayload): CalculateDayResponse => {
	const taskPoints = parseInt(currentTask.points, 10);
	const updatedTotal = payload.runningTotal + taskPoints;
	const incrementDate = updatedTotal >= payload.pointsPerDay;

	return {
		incrementDate,
		updatedTotal: incrementDate ? MIN_TOTAL : updatedTotal,
	};
};
