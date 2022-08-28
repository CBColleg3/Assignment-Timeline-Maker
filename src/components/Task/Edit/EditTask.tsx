import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import type { AssignmentDate, Task } from "src/@types";
import DatePicker from "react-datepicker";
import { useAssignmentDateInfoContext, useTaskContext } from "src/context";
import { COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH } from "src/helpers";
import { findDateTaskUnder } from "src/helpers/AssignmentDateInfo/findDateTaskUnder";
import { useForm } from "react-hook-form";

const CONSTANTS = {
	INVALID_DATE_STRING:
		"Looks like your inputted date is not within the current timeline start and end dates, please change the assignment dates above.",
	RANDOM_COLOR_BASE_IND: 0,
	RANDOM_NUMBER_FORMULA_CONSTANT_INC: 1,
	TASK_INDEX_INC: 1,
	UPDATE_DAY_COUNTER_INC: 1,
	UPDATE_LOOP_INC: 1,
	UPDATE_POINT_SUM_VAL: 0,
};

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
 * Controls the editing of the singular task within the timeline
 *
 * @param {EditTaskProps} props The props passed into the EditTask component
 * @returns {JSX.Element} The EditTask component
 */
export const EditTask = ({ task, editMode, index, setEditMode }: EditTaskProps): JSX.Element => {
	const { dates, end, format, start } = useAssignmentDateInfoContext();
	const { updateTasks, editTask, tasks } = useTaskContext();
	const { formState, getValues, register, watch } = useForm({
		defaultValues: { ...task, dueDate: task.dueDate.getTime(), points: parseInt(task.points, 10) },
		mode: "all",
		reValidateMode: "onChange",
	});

	console.log(getValues());

	const [name, setName] = useState<string>(task.name);
	const [document, setDocument] = useState<string>(task.document);
	const [points, setPoints] = useState<string>(task.points);
	const [dueDate, setDueDate] = useState<Date>(task.dueDate);
	const [color, setColor] = useState<string>(task.color);
	const [timelineError, setTimelineError] = useState<boolean>(false);

	/**
	 * Updates the TaskContext's tasks
	 */
	function changeTasks(): void {
		// const dateValueAssociatedWithNewTask = findDateTaskUnder(newTask, dates);
		// newTask.color = dateValueAssociatedWithNewTask.color;
		// const clonedTasks = [...tasks].map(
		// 	(_task, ind): Task => (ind === index ? newTask : { ..._task, dueDate: new Date(_task.dueDate.getTime()) }),
		// );
		// const sortedTasks = clonedTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
		// updateTasks(sortedTasks);
	}

	/**
	 *
	 * Updates the due date of a task and also changes the color to a another tasks if the date already exists or a new one if the new date doesnt exist
	 *
	 * @param date the date parameter that is changed
	 */
	function updateDueDate(date: Date): void {
		setDueDate(date);
		let taskColor = fetchRandomColor();
		[...tasks].forEach((_task) => {
			if (_task.dueDate.toDateString() === date.toDateString()) {
				taskColor = _task.color;
			}
		});
		setTimelineError(false);
		if (date.getTime() > end.date.getTime() || date.getTime() < start.date.getTime()) {
			setTimelineError(true);
		}
		setColor(taskColor);
	}

	return (
		<div>
			<Modal
				animation
				onHide={(): void => setEditMode(false)}
				show={editMode}
			>
				<Modal.Header closeButton>
					<Modal.Title className="fw-bold">{"Edit Task"}</Modal.Title>
				</Modal.Header>
				<Modal.Body className="d-flex flex-column">
					<div className="d-flex flex-row justify-content-between mb-3">
						<p className="my-auto">{"\u2022 Task Name"}</p>
						<Form.Control
							className="w-50"
							onChange={(ev): void => setName(ev.target.value)}
							value={name}
						/>
					</div>
					<div className="d-flex flex-row justify-content-between mb-3">
						<p className="my-auto">{"\u2022 Task Document Part"}</p>
						<Form.Control
							className="w-50"
							onChange={(ev): void => setDocument(ev.target.value)}
							value={document}
						/>
					</div>
					<div className="d-flex flex-row justify-content-between mb-3">
						<p className="my-auto">{"\u2022 Task Points"}</p>
						<Form.Control
							className="w-50"
							onChange={(ev): void => setPoints(ev.target.value)}
							type="number"
							value={parseInt(points, 10)}
						/>
					</div>
					<div className="d-flex flex-row justify-content-between mb-3">
						<p className="my-auto">{"\u2022 Task Due Date"}</p>

						<DatePicker
							dateFormat="Pp"
							onChange={(date: Date): void => updateDueDate(date)}
							selected={dueDate}
							showTimeSelect
							wrapperClassName="w-50"
						/>
					</div>
					{timelineError && <Form.Group as={Row}>{CONSTANTS.INVALID_DATE_STRING}</Form.Group>}
					{!timelineError && (
						<div className="d-flex flex-row-reverse mt-4">
							<Button
								onClick={(): void => {
									changeTasks();
									setEditMode(!editMode);
								}}
							>
								{"Save Changes"}
							</Button>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</div>
	);
};
