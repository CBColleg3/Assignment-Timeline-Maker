import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import type { Task } from "src/@types";
import DatePicker from "react-datepicker";

/**
 * Overrides React.ChangeEvent with specific values
 */
type TaskChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

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
export const EditTask = ({
	taskArray,
	setTaskArray,
	index,
	editMode,
	setEditMode,
}: EditTaskProps): JSX.Element => {
	const [nameField, setNameField] = useState<string>(taskArray[index].name);
	const [documentField, setDocumentField] = useState<string>(taskArray[index].document);
	const [pointsField, setPointsField] = useState<string>(taskArray[index].points);
	const [dueDateField, setDueDateField] = useState<Date>(taskArray[index].dueDate);

	/**
	 * Updates the modifiedTasks array
	 *
	 * @param {number} ind The index of the task in the modifiedTasks array
	 */
	function updateTasks(ind: number): void {
		const modifiedTasks = [...taskArray].map((task: Task) => ({
			...task,
			dueDate: new Date(task.dueDate.getTime()),
		}));
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
			<Modal
				animation
				data-testId="message-modal"
				onHide={(): void => setEditMode(false)}
				show={editMode}
			>
				<Modal.Header closeButton>
					<Modal.Title>{"Test"}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
							<p style={{ marginBottom: "0px" }}>{"Task Due Date"}</p>
						</Col>
						<Col>
							<DatePicker
								dateFormat="Pp"
								onChange={(date: Date): void => setDueDateField(date)}
								selected={dueDateField}
								showTimeSelect
							/>
						</Col>
					</Form.Group>
					<br />
					<br />
					<div style={{ textAlign: "right" }}>
						<Button
							onClick={(): void => {
								updateTasks(index);
								setEditMode(!editMode);
							}}
						>
							{"Save Changes"}
						</Button>
						<Button
							data-testId="close-modal-button"
							onClick={(): void => setEditMode(false)}
						>
							{"Close"}
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};
