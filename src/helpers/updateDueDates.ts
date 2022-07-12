/* eslint-disable @typescript-eslint/no-loop-func -- no invalid practices being used*/
/* eslint-disable no-loop-func -- no invalid practices being used*/
import type { AssignmentDate } from "src/@types/AssignmentDate/AssignmentDate";
import type { Task } from "src/@types/Task";
import { calcTotalPoints, calcDiffInDays, COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH } from "src/helpers";
import { calcDays } from "./calcDays";

const CONSTANTS = {
	RANDOM_COLOR_BASE_IND: 0,
	RANDOM_NUMBER_FORMULA_CONSTANT_INC: 1,
	UPDATE_DAY_COUNTER_INC: 1,
	UPDATE_LOOP_INC: 1,
	UPDATE_POINT_SUM_VAL: 0,
};

type CalculateDayResponse = {
	incrementDate: boolean;
	updatedTotal: number;
};

type CalculateDayPayload = {
	runningTotal: number;
	pointsPerDay: number;
	currentDay: Date;
};

/**
 * Used to generate random indexes for the color of the documents
 *
 * @param min The minimum value
 * @param max The maximum value
 * @returns Randomized value
 */
const randomInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + CONSTANTS.RANDOM_NUMBER_FORMULA_CONSTANT_INC) + min);

/**
 * Fetches a random color from the color hex library using the crypto randomInt function to get a secure random number
 *
 * @returns Random color fetched from the color library
 */
const fetchRandomColor = (): string =>
	COLOR_HEX_ARRAY[randomInt(CONSTANTS.RANDOM_COLOR_BASE_IND, COLOR_HEX_ARRAY_LENGTH)];

/**
 * Fetches a random color without using a color that has already been used.
 * - If all colors have been used, returns a random one
 *
 * @param usedColors Array of colors already used
 * @returns Color that has not been used
 */
const fetchRandomColorWithoutDuplicates = (usedColors: string[]): string => {
	if (usedColors.length === COLOR_HEX_ARRAY_LENGTH) {
		return fetchRandomColor();
	}

	let color = fetchRandomColor();
	while (usedColors.includes(color)) {
		color = fetchRandomColor();
	}
	return color;
};

/**
 * Updates the due dates for all task objects, first it deep clones the original task array then it passes it into a helper function which returns
 * an object with a date, a boolean, and a number. The boolean is for the number of days to complete the task increases while the number is the
 * total number of points before the number of days increases. It then updates all of the tasks dueDate fields and updates TaskArray state.
 *
 * @param {Task[]} tasks The task objects
 * @param {AssignmentDate} assignmentDate The assignment date
 * @returns {void}
 */
const updateDueDates = (tasks: Task[], assignmentDate: AssignmentDate): Task[] => {
	let taskClone = [...tasks].map((eachTask) => ({ ...eachTask }));
	let runningTotal = 0;
	let currentColor = fetchRandomColor();

	const totalPoints = calcTotalPoints(tasks);
	const dateDiff = calcDiffInDays(assignmentDate.start, assignmentDate.end);
	const pointsPerDay = Math.ceil(totalPoints / dateDiff);

	const currentDay = assignmentDate.start;

	const usedColors = [currentColor];
	for (let i = 0; i < taskClone.length; i += CONSTANTS.UPDATE_LOOP_INC) {
		const eachTask = taskClone[i];
		const response: CalculateDayResponse = calcDays(eachTask, { currentDay, pointsPerDay, runningTotal });
		if (response.incrementDate) {
			currentDay.setDate(currentDay.getDate() + CONSTANTS.UPDATE_DAY_COUNTER_INC);
			console.log("Incrementing currentDay");
			currentColor = fetchRandomColorWithoutDuplicates(usedColors);
		}
		taskClone = [...taskClone].map((eTask, ind) => {
			if (ind === i) {
				return { ...eTask, color: currentColor, dueDate: currentDay };
			}
			return { ...eTask, color: currentColor };
		});
		runningTotal = response.updatedTotal;
	}
	return taskClone;
};

export { updateDueDates, type CalculateDayPayload, type CalculateDayResponse };
