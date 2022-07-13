import React from "react";
import { Button } from "react-bootstrap";
import type { Task } from "src/@types";
import { COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH } from "src/helpers";

const CONSTANTS = {
	RANDOM_COLOR_BASE_IND: 0,
	RANDOM_NUMBER_FORMULA_CONSTANT_INC: 1,
	UPDATE_DAY_COUNTER_INC: 1,
	UPDATE_LOOP_INC: 1,
	UPDATE_POINT_SUM_VAL: 0,
};

/**
 * Props for the AddRemoveTask component
 */
type AddRemoveTaskProps = {
	/**
	 * Tasks in the document
	 */
	taskArray: Task[];
	/**
	 * Set the tasks in the document
	 */
	setTaskArray: (tasks: Task[]) => void;
	/**
	 * Current task index in the array of tasks
	 */
	index: number;
};

/**
 * Functions for adding and removing tasks
 *
 * @param {AddRemoveTaskProps} props The properties of the component
 * @returns {JSX.Element} AddRemoveTask component, that houses the logic for updating a singular task in the array of tasks
 */
export const AddRemoveTask = ({ taskArray, setTaskArray, index }: AddRemoveTaskProps): JSX.Element => {
	const IND_INC = 1;
	const MODIFIED_TASK_SPLICE_DELETE_COUNT = 0;
	const MODIFIED_PTS_SPLICE_DELETE_COUNT = 1;

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
	 * This function generates a random crypto color
	 *
	 * @returns  {string} returns string for color
	 */
	const fetchRandomColor = (): string =>
		COLOR_HEX_ARRAY[randomInt(CONSTANTS.RANDOM_COLOR_BASE_IND, COLOR_HEX_ARRAY_LENGTH)];

	/**
	 * This function adds a part right below the task you've selected.
	 *
	 * @param ind current task index in the array of tasks
	 */
	function addPart(ind: number): void {
		const modifiedTaskArr: Task[] = [...taskArray].map((eachTask) => ({
			...eachTask,
			dueDate: new Date(eachTask.dueDate.getTime()),
		}));
		modifiedTaskArr.splice(ind + IND_INC, MODIFIED_TASK_SPLICE_DELETE_COUNT, {
			autoDueDate: false,
			color: fetchRandomColor(),
			document: "Uh Oh",
			dueDate: new Date(),
			id: ind + IND_INC,
			name: "Swag",
			points: "0",
		});
		setTaskArray(modifiedTaskArr);
	}

	/**
	 * This function removes the current task you're on.
	 *
	 * @param {number} ind current task index in the array of tasks
	 */
	function removePart(ind: number): void {
		const modifiedPtsArr = [...taskArray].map((eachTask) => ({
			...eachTask,
			dueDate: new Date(eachTask.dueDate.getTime()),
		}));
		modifiedPtsArr.splice(ind, MODIFIED_PTS_SPLICE_DELETE_COUNT);
		setTaskArray(modifiedPtsArr);
	}

	return (
		<div>
			<Button onClick={(): void => addPart(index)}>{"Add Part"}</Button>
			<Button onClick={(): void => removePart(index)}>{"Remove Part"}</Button>
		</div>
	);
};
