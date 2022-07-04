import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import type { Task } from "../interfaces/task";

/**
 * Overrides React.ChangeEvent with specific values
 */
type TaskChangeEvent = React.ChangeEvent<
	HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

/**
 * Props of the EditTask component
 */
type EditTaskProps = {
	/**
	 * Tasks in the current document
	 */
	taskArray: Task[];
	/**
	 * Sets the tasks in the current document
	 */
	setTaskArray: (tasks: Task[]) => void;
	/**
	 * The index of where the current task is in the array of tasks
	 */
	index: number;
};

/**
 * Controls the editing of the singular task within the timeline
 *
 * @param {EditTaskProps} props The props passed into the EditTask component
 * @returns {JSX.Element} The EditTask component
 */
export function EditTask({
	taskArray,
	setTaskArray,
	index,
}: EditTaskProps): JSX.Element {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [nameField, setNameField] = useState<string>(taskArray[index].name);
	const [documentField, setDocumentField] = useState<string>(
		taskArray[index].document,
	);
	const [pointsField, setPointsField] = useState<string>(
		taskArray[index].points,
	);

	/**
	 * Updates the task at the index with the fields entered in the form
	 *
	 * @param {number} index The index of the document in the array of tasks
	 */
	function updateTasks(index: number) {
		const modifiedTasks = [...taskArray].map((task: Task) => {
			return { ...task };
		});
		modifiedTasks[index].name = nameField;
		modifiedTasks[index].document = documentField;
		modifiedTasks[index].points = pointsField;
		setTaskArray(modifiedTasks);
	}

	/**
	 * Updates the namefield state according to `event`'s `.target.value`
	 *
	 * @param {TaskChangeEvent} event The change event that happens when a user interacts with a form
	 */
	function updateNameField(event: TaskChangeEvent) {
		setNameField(event.target.value);
	}

	/**
	 * Updates the document field according to the `event`'s `.target.value`
	 *
	 * @param {TaskChangeEvent} event The change event that happens when a user interacts with a form
	 */
	function updateDocumentField(event: TaskChangeEvent) {
		setDocumentField(event.target.value);
	}

	/**
	 * Updates the points field according to the `event`'s `.target.value`
	 *
	 * @param {TaskChangeEvent} event The change event that happens when a user interacts with a form
	 */
	function updatePointsField(event: TaskChangeEvent) {
		setPointsField(event.target.value);
	}

	return (
		<div>
			<Button
				onClick={() => {
					setEditMode(!editMode);
				}}
			>
				{" "}
				{!editMode ? "Edit Task" : "Close"}{" "}
			</Button>
			{editMode && (
				<div>
					<Form.Group as={Row}>
						<Col>
							<p style={{ marginBottom: "0px" }}>Task Name</p>
						</Col>
						<Col>
							<Form.Control
								data-testId="change-name-field-box"
								value={nameField}
								onChange={updateNameField}
							></Form.Control>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col>
							<p style={{ marginBottom: "0px" }}>Task Document Part</p>
						</Col>
						<Col>
							<Form.Control
								data-testId="change-document-part-box"
								value={documentField}
								onChange={updateDocumentField}
							></Form.Control>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col>
							<p style={{ marginBottom: "0px" }}>Task Points</p>
						</Col>
						<Col>
							<Form.Control
								data-testId="change-task-points-box"
								type="number"
								value={parseInt(pointsField)}
								onChange={updatePointsField}
							></Form.Control>
						</Col>
					</Form.Group>
					<Button
						onClick={() => {
							updateTasks(index);
							setEditMode(!editMode);
						}}
					>
						Save Changes
					</Button>
				</div>
			)}
		</div>
	);
}
