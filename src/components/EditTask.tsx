import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import type { Task } from "../templates/task";
import DatePicker from "react-datepicker";

/**
 * Overrides React.ChangeEvent with specific values
 */
type TaskChangeEvent = React.ChangeEvent<
	HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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
export const EditTask = ({
	taskArray,
	setTaskArray,
	index,
}: EditTaskProps): JSX.Element => {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [nameField, setNameField] = useState<string>(taskArray[index].name);
	const [documentField, setDocumentField] = useState<string>(
		taskArray[index].document,
	);
	const [pointsField, setPointsField] = useState<string>(
		taskArray[index].points,
	);
	const [dueDateField, setDueDateField] = useState<Date>(
		taskArray[index].dueDate,
	);

	/**
	 * Updates the modifiedTasks array
	 *
	 * @param {number} ind The index of the task in the modifiedTasks array
	 */
	function updateTasks(ind: number): void {
		const modifiedTasks = [...taskArray].map((task: Task) => ({ ...task }));
		modifiedTasks[ind].name = nameField;
		modifiedTasks[ind].document = documentField;
		modifiedTasks[ind].points = pointsField;
		modifiedTasks[ind].dueDate = dueDateField;
		setTaskArray(modifiedTasks);
	}
	/**
	 * Updates the namefield state according to `event`'s `.target.value`
	 *
	 * @param {TaskChangeEvent} event The change event that happens when a user interacts with a form
	 */
	function updateNameField(event: TaskChangeEvent): void {
		setNameField(event.target.value);
	}

	/**
	 * Updates the document field according to the `event`'s `.target.value`
	 *
	 * @param {TaskChangeEvent} event The change event that happens when a user interacts with a form
	 */
	function updateDocumentField(event: TaskChangeEvent): void {
		setDocumentField(event.target.value);
	}

	/**
	 * Updates the points field according to the `event`'s `.target.value`
	 *
	 * @param {TaskChangeEvent} event The change event that happens when a user interacts with a form
	 */
	function updatePointsField(event: TaskChangeEvent): void {
		setPointsField(event.target.value);
	}
	return (
		<div>
			<Button onClick={(): void => setEditMode(!editMode)}>
				{" "}
				{!editMode ? "Edit Task" : "Close"}{" "}
			</Button>
			{editMode && (
				<div>
					<Form.Group as={Row}>
						<Col>
							<p style={{ marginBottom: "0px" }}>{"Task Name"}</p>
						</Col>
						<Col>
							<Form.Control
								data-testId="change-name-field-box"
								onChange={(ev): void => updateNameField(ev)}
								value={nameField}
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col>
							<p style={{ marginBottom: "0px" }}>{"Task Document Part"}</p>
						</Col>
						<Col>
							<Form.Control
								data-testId="change-document-part-box"
								onChange={(ev): void => updateDocumentField(ev)}
								value={documentField}
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col>
							<p style={{ marginBottom: "0px" }}>{"Task Points"}</p>
						</Col>
						<Col>
							<Form.Control
								data-testId="change-task-points-box"
								onChange={(ev): void => updatePointsField(ev)}
								type="number"
								value={parseInt(pointsField, 10)}
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col>
							<DatePicker
								dateFormat="Pp"
								onChange={(date: Date): void => setDueDateField(date)}
								selected={dueDateField}
								showTimeSelect
							/>
						</Col>
					</Form.Group>

					<Button
						onClick={(): void => {
							updateTasks(index);
							setEditMode(!editMode);
						}}
					>
						{"Save Changes"}
					</Button>
				</div>
			)}
		</div>
	);
};
