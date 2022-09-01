/* eslint-disable @typescript-eslint/no-loop-func -- no invalid practices being used*/
/* eslint-disable no-loop-func -- no invalid practices being used*/
import type { AssignmentDate, Task } from "src/@types";
import type { iAssignmentDateInfoContextFormat } from "src/@types/AssignmentDate/iAssignmentDateInfoContextFormat";
import { calcTotalPoints, COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH } from "src/helpers";
import { findDateTaskUnder } from "../AssignmentDateInfo/findDateTaskUnder";
import { mutateCurrentDay } from "../AssignmentDateInfo/mutateCurrentDay";
import { calcDiff } from "./calcDiff";

const CONSTANTS = {
	MS_IN_DAY: 86400000.0,
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
 * @param tasks - The task objects
 * @param format - The format of the dates (day, hour, etc)
 * @param dates - The assignment dates we will be using to generate the colors of the tasks
 * @returns The updated Tasks
 */
const updateDueDates = (
	tasks: Task[],
	format: iAssignmentDateInfoContextFormat,
	dates: AssignmentDate[],
): Task[] => {
	const end = dates[dates.length - 1];
	const start = dates[0];
	const currentDay = new Date(start.date.getTime());
	const pointsThreshold = Math.ceil(calcTotalPoints(tasks) / calcDiff(start.date, end.date, format));

	let taskClone = [...tasks].map((eachTask) => ({
		...eachTask,
		dueDate: new Date(eachTask.dueDate),
	}));
	let incrementDate = false;
	let runningTotal = 0;
	let currentColor = findDateTaskUnder(currentDay, dates).color;

	for (let i = 0; i < taskClone.length; i += 1) {
		const eachTask = taskClone[i];
		if (runningTotal + eachTask.points > pointsThreshold) {
			incrementDate = true;
		}
		taskClone = [...taskClone].map((eTask, ind) => {
			if (ind === i) {
				return { ...eTask, color: currentColor, dueDate: new Date(currentDay.getTime()) };
			}
			return { ...eTask, color: eTask.color };
		});
		runningTotal = incrementDate ? 0 : runningTotal + eachTask.points;
		if (incrementDate) {
			mutateCurrentDay(currentDay, format, "inc");
			currentColor = findDateTaskUnder(currentDay, dates).color;
			incrementDate = false;
		}
	}
	return taskClone;
};

export { updateDueDates, type CalculateDayPayload, type CalculateDayResponse };
