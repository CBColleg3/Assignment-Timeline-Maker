import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import type { Task } from "src/@types";
import DatePicker from "react-datepicker";
import { useTaskContext } from "src/context";

/**
 * Props of the EditTask component
 */
type EditTaskProps = {
	task: Task;

	editMode: boolean;

	index: number;

	setEditMode: (_editMode: boolean) => void;
};

/**
 * Controls the editing of the singular task within the timeline
 *
 * @param {EditTaskProps} props The props passed into the EditTask component
 * @returns {JSX.Element} The EditTask component
 */
export const EditTask = ({ task, editMode, index, setEditMode }: EditTaskProps): JSX.Element => {
	const [name, setName] = useState<string>(task.name);
	const [document, setDocument] = useState<string>(task.document);
	const [points, setPoints] = useState<string>(task.points);
	const [dueDate, setDueDate] = useState<Date>(task.dueDate);
	const { setTasks, tasks } = useTaskContext();

	/**
	 * Updates the TaskContext's tasks
	 */
	function updateTasks(): void {
		const newTask = { ...task, document, dueDate, name, points };
		const clonedTasks = [...tasks].map(
			(_task, ind): Task => (ind === index ? newTask : { ..._task, dueDate: new Date(_task.dueDate.getTime()) }),
		);
		setTasks(clonedTasks);
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
								onChange={(ev): void => setName(ev.target.value)}
								value={name}
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
								onChange={(ev): void => setDocument(ev.target.value)}
								value={document}
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
								onChange={(ev): void => setPoints(ev.target.value)}
								type="number"
								value={parseInt(points, 10)}
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
								onChange={(date: Date): void => setDueDate(date)}
								selected={dueDate}
								showTimeSelect
							/>
						</Col>
					</Form.Group>
					<br />
					<br />
					<div style={{ textAlign: "right" }}>
						<Button
							onClick={(): void => {
								updateTasks();
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
