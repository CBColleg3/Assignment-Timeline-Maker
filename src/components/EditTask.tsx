import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import type { Task } from "../templates/task";
import DatePicker from "react-datepicker";

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

	editMode: boolean;

	setEditMode: (editMode: boolean) => void;
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
	editMode,
	setEditMode,
}: EditTaskProps): JSX.Element {
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
	 * @param {number} index The index of the task in the modifiedTasks array
	 */
	function updateTasks(index: number) {
		const modifiedTasks = [...taskArray].map((task: Task) => {
			return { ...task };
		});
		modifiedTasks[index].name = nameField;
		modifiedTasks[index].document = documentField;
		modifiedTasks[index].points = pointsField;
		modifiedTasks[index].dueDate = dueDateField;
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
			<Modal
				show={editMode}
				onHide={() => setEditMode(false)}
				animation={true}
				data-testId="message-modal"
			>
				<Modal.Header closeButton>
					<Modal.Title>Test</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
					<Form.Group as={Row}>
						<Col>
							<p style={{ marginBottom: "0px" }}>Task Due Date</p>
						</Col>
						<Col>
							<DatePicker
								showTimeSelect
								dateFormat="Pp"
								selected={dueDateField}
								onChange={(date: Date) => setDueDateField(date)}
							/>
						</Col>
					</Form.Group>
					<br></br>
					<br></br>
					<div style={{ textAlign: "right" }}>
						<Button
							onClick={() => {
								updateTasks(index);
								setEditMode(!editMode);
							}}
						>
							Save Changes
						</Button>
						<Button onClick={() => setEditMode(false)} data-testId="close-modal-button">
							Close
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
