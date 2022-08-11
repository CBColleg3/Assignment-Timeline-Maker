import React from "react";
import { Button } from "react-bootstrap";
import type { Task } from "src/@types";
import { useTaskContext } from "src/context";
import { COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH } from "src/helpers";

const CONSTANTS = {
	RANDOM_COLOR_BASE_IND: 0,
	RANDOM_NUMBER_FORMULA_CONSTANT_INC: 1,
	TASK_INDEX_INC: 1,
	UPDATE_DAY_COUNTER_INC: 1,
	UPDATE_LOOP_INC: 1,
	UPDATE_POINT_SUM_VAL: 0,
};

/**
 * Props for the AddRemoveTask component
 */
type AddRemoveTaskProps = {
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
export const AddRemoveTask = ({ index }: AddRemoveTaskProps): JSX.Element => {
	const { tasks, setTasks } = useTaskContext();
	const IND_INC = 1;
	const MODIFIED_TASK_SPLICE_DELETE_COUNT = 0;
	const MODIFIED_PTS_SPLICE_DELETE_COUNT = 1;

	/**
	 * This function adds a part right below the task you've selected.
	 *
	 * @param ind current task index in the array of tasks
	 */
	function addPart(ind: number): void {
		const modifiedTaskArr: Task[] = [...tasks].map((eachTask) => ({
			...eachTask,
			dueDate: new Date(eachTask.dueDate),
		}));
		modifiedTaskArr.splice(ind + IND_INC, MODIFIED_TASK_SPLICE_DELETE_COUNT, {
			autoDueDate: false,
			color: modifiedTaskArr[ind].color,
			document: "Uh Oh",
			dueDate: modifiedTaskArr[ind].dueDate,
			id: modifiedTaskArr.length + CONSTANTS.TASK_INDEX_INC,
			name: "Swag",
			points: "0",
		});
		setTasks(modifiedTaskArr);
	}

	/**
	 * This function removes the current task you're on.
	 *
	 * @param {number} ind current task index in the array of tasks
	 */
	function removePart(ind: number): void {
		const modifiedPtsArr = [...tasks].map((eachTask) => ({
			...eachTask,
			dueDate: new Date(eachTask.dueDate),
		}));
		modifiedPtsArr.splice(ind, MODIFIED_PTS_SPLICE_DELETE_COUNT);
		setTasks(modifiedPtsArr);
	}

	return (
		<div>
			<Button
				onClick={(): void => addPart(index)}
				variant="outline-primary"
			>
				{"Add Part"}
			</Button>
			<Button
				className="ms-2"
				onClick={(): void => removePart(index)}
				variant="outline-primary"
			>
				{"Remove Part"}
			</Button>
		</div>
	);
};
