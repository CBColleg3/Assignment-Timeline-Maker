/* eslint-disable @typescript-eslint/no-loop-func -- no invalid practices being used*/
/* eslint-disable no-loop-func -- no invalid practices being used*/
import type { AssignmentDate, Task } from "src/@types";
import type { iAssignmentDateInfoContextFormat } from "src/@types/AssignmentDate/iAssignmentDateInfoContextFormat";
import { calcTotalPoints } from "src/helpers";
import { findDateTaskUnder } from "../AssignmentDateInfo/findDateTaskUnder";
import { mutateCurrentDay } from "../AssignmentDateInfo/mutateCurrentDay";
import { calcDiff } from "./calcDiff";

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
