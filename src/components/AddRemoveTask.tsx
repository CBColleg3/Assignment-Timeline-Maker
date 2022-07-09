import React from "react";
import { Button } from "react-bootstrap";
import type { Task } from "../templates/task";

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
export const AddRemoveTask = ({
	taskArray,
	setTaskArray,
	index,
}: AddRemoveTaskProps): JSX.Element => {
	const IND_INC = 1;
	const MODIFIED_TASK_SPLICE_DELETE_COUNT = 0;
	const MODIFIED_PTS_SPLICE_DELETE_COUNT = 1;

	/**
	 * This function adds a part right below the task you've selected.
	 *
	 * @param ind current task index in the array of tasks
	 */
	function addPart(ind: number): void {
		const modifiedTaskArr = [...taskArray];
		modifiedTaskArr.splice(ind + IND_INC, MODIFIED_TASK_SPLICE_DELETE_COUNT, {
			autoDueDate: false,
			color: 0,
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
		const modifiedPtsArr = [...taskArray];
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
