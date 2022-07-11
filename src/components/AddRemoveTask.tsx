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
export function AddRemoveTask({
	taskArray,
	setTaskArray,
	index,
}: AddRemoveTaskProps): JSX.Element {
	/**
	 * This function adds a part right below the task you've selected.
	 *
	 * @param {number} index current task index in the array of tasks
	 */
	function AddPart(index: number) {
		const modifiedTaskArr = [...taskArray].map((task: Task) => {
			return { ...task };
		});
		modifiedTaskArr.splice(index + 1, 0, {
			name: "Swag",
			id: index + 1,
			document: "Uh Oh",
			points: "0",
			color: Math.random().toString(16).substr(-6),
			dueDate: new Date(),
			autoDueDate: false,
		});
		setTaskArray(modifiedTaskArr);
	}

	/**
	 * This function removes the current task you're on.
	 *
	 * @param {number} index current task index in the array of tasks
	 */
	function RemovePart(index: number) {
		const modifiedPtsArr = [...taskArray].map((task: Task) => {
			return { ...task };
		});
		modifiedPtsArr.splice(index, 1);
		setTaskArray(modifiedPtsArr);
	}

	return (
		<div>
			<Button onClick={() => AddPart(index)}>Add Part</Button>
			<Button onClick={() => RemovePart(index)}>Remove Part</Button>
		</div>
	);
}
