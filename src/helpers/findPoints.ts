import type { Task } from "src/@types/Task";
import { REGEX_EXPRESSIONS } from "./regexExpressions";

/**
 * Constants for the function
 */
const CONSTANTS = {
	COLOR_RESULT_MULTIPLIER: 5,
	HEX_RADIX: 16,
	RE_NUM_INDEX: 0,
	RE_NUM_RESULT_MIN_LENGTH: 0,
	TASK_INDEX_INC: 1,
	TEMP_ARRAY_INDEX: 0,
};

/**
 * This function uses regex to first find a sentence or phrase that starts and ends with a period, a comma, or a semicolon,
 * it then finds two or more numbers followed by the word point, pt, points, or pts shortly after the number and then ends with a
 * period, comma, or a semicolon to capture that part of the document. The full phrase is given via the document field of the
 * task object, and it's further parsed by finding the regex of the number followed by points to get the actual points of the task.
 * Once we find all of this we put it into a taskArray by adding each element of the captured document.
 *
 * @param {Promise<string>} text documentText used for finding points
 * @returns {void}
 */
export const findPoints = async (text: Promise<string>): Promise<Task[]> => {
	const tasks: Task[] = [];
	const fileText = await text;

	const results = fileText.match(REGEX_EXPRESSIONS.POINTS_AMT_EXPR);
	let taskIndex = 0;

	if (results) {
		for (const elem of results) {
			const pointSectionResult = elem.match(REGEX_EXPRESSIONS.POINTS_AMT_EXPR);
			if (pointSectionResult && pointSectionResult.length > CONSTANTS.RE_NUM_RESULT_MIN_LENGTH) {
				const points = pointSectionResult[CONSTANTS.RE_NUM_INDEX];
				const parsedPoints = points.replace(REGEX_EXPRESSIONS.POINTS_EXPR, "");

				if (parsedPoints) {
					tasks.push({
						autoDueDate: true,
						color: "0000",
						document: elem.toString(),
						dueDate: new Date(),
						id: taskIndex + CONSTANTS.TASK_INDEX_INC,
						name: `${"Finish Task"}  ${taskIndex + CONSTANTS.TASK_INDEX_INC}`,
						points: parsedPoints,
					});
					taskIndex += CONSTANTS.TASK_INDEX_INC;
				}
			}
		}
	}
	return tasks;
};
