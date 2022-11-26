/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import type { Task } from "src/@types";
import DatePicker from "react-datepicker";
import { useAssignmentDateInfoContext, useTaskContext } from "src/context";
import { isSameDay } from "src/helpers";
import { findDateTaskUnder } from "src/helpers/AssignmentDateInfo/findDateTaskUnder";
import { useForm } from "react-hook-form";
import { EDIT_TASK_CONSTANTS, INVALID, VALID } from "./EditTaskValidationMessages";
import { isErrorsValid } from "src/common";

/**
 * Props of the EditTask component
 */
type EditTaskProps = {
	/**
	 * The task object itself
	 */
	task: Task;
	/**
	 * Whether the task is in edit mode or not
	 */
	editMode: boolean;
	/**
	 * The index of the task
	 */
	index: number;
	/**
	 * Function to alter the edit mode
	 */
	setEditMode: (_editMode: boolean) => void;
};

/**
 * Controls the editing of the singular task within the timeline
 *
 * @param props The props passed into the EditTask component
 * @param props.task - The task object itself
 * @param props.editMode - Whether the task is in edit mode or not
 * @param props.index - The index of the task within the internal tasks array
 * @param props.setEditMode - Function to set the edit mode
 * @returns {JSX.Element} The EditTask component
 */
export const EditTask = ({ task, editMode, index, setEditMode }: EditTaskProps): JSX.Element => {
	const { dates, end, start } = useAssignmentDateInfoContext();
	const { editTask } = useTaskContext();
	const { formState, getValues, register, reset } = useForm({
		defaultValues: { ...task },
		mode: "all",
		reValidateMode: "onChange",
	});

	const [dateError, setDateError] = React.useState<string>();
	const [dueDate, setDueDate] = useState<Date>(task.dueDate);

	React.useEffect(() => {
		if (task) {
			reset({ ...task });
			setDueDate(task.dueDate);
		}
	}, [reset, task]);

	const { errors } = formState;

	/**
	 * Helper function for validating the date, and setting the appropriate stats dependent on whether the date is in range
	 *
	 * @param date - The date we are validating
	 */
	const validateDate = (date: Date): void => {
		if (date.getTime() < start.date.getTime()) {
			setDateError(INVALID.dueDate.afterStart(start.date.toLocaleString()));
		} else if (date.getTime() > end.date.getTime()) {
			setDateError(INVALID.dueDate.beforeEnd(end.date.toLocaleString()));
		} else {
			setDateError(undefined);
		}
	};

	/**
	 * Updates the TaskContext's tasks
	 */
	function changeTasks(): void {
		const updatedDate = findDateTaskUnder(dueDate, dates);
		const { color } = updatedDate;
		editTask({ ...getValues(), color, dueDate }, index, !isSameDay(task.dueDate, dueDate));
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
						<Form.Group>
							<Form.Control
								className="w-100"
								isInvalid={isErrorsValid(errors.name).invalid}
								isValid={isErrorsValid(errors.name).valid}
								{...register("name", {
									maxLength: { message: INVALID.name.maxLength, value: EDIT_TASK_CONSTANTS.name.maxLength },
									minLength: { message: INVALID.name.minLength, value: EDIT_TASK_CONSTANTS.name.minLength },
									required: { message: INVALID.name.required, value: EDIT_TASK_CONSTANTS.name.required },
									setValueAs: (value: string) => value.trim(),
								})}
							/>
							{errors?.name && (
								<Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>
							)}
							<Form.Control.Feedback type="valid">{VALID.name}</Form.Control.Feedback>
						</Form.Group>
					</div>
					<div className="d-flex flex-row justify-content-between mb-3">
						<p className="my-auto">{"\u2022 Task Description"}</p>
						<Form.Group>
							<Form.Control
								as="textarea"
								className="w-100"
								isInvalid={isErrorsValid(errors.description).invalid}
								isValid={isErrorsValid(errors.description).valid}
								{...register("description", {
									maxLength: {
										message: INVALID.description.maxLength,
										value: EDIT_TASK_CONSTANTS.description.maxLength,
									},
									minLength: {
										message: INVALID.description.minLength,
										value: EDIT_TASK_CONSTANTS.description.minLength,
									},
									required: {
										message: INVALID.description.required,
										value: EDIT_TASK_CONSTANTS.description.required,
									},
									setValueAs: (value: string) => value.trim(),
								})}
							/>
							{errors?.description && (
								<Form.Control.Feedback type="invalid">{errors.description.message}</Form.Control.Feedback>
							)}
							<Form.Control.Feedback type="valid">{VALID.description}</Form.Control.Feedback>
						</Form.Group>
					</div>
					<div className="d-flex flex-row justify-content-between mb-3">
						<p className="my-auto">{"\u2022 Task Points"}</p>
						<Form.Group>
							<Form.Control
								className="w-100"
								isInvalid={isErrorsValid(errors.points).invalid}
								isValid={isErrorsValid(errors.points).valid}
								{...register("points", {
									min: { message: INVALID.points.min, value: EDIT_TASK_CONSTANTS.points.min },
									valueAsNumber: true,
								})}
								type="number"
							/>
							{errors?.points && (
								<Form.Control.Feedback type="invalid">{errors.points.message}</Form.Control.Feedback>
							)}
							<Form.Control.Feedback type="valid">{VALID.points}</Form.Control.Feedback>
						</Form.Group>
					</div>
					<div className="d-flex flex-row justify-content-between mb-3">
						<p className="my-auto">{"\u2022 Task Due Date"}</p>
						<Form.Group>
							<DatePicker
								className={`${
									dateError ? "border border-danger border-opacity-25" : "border border-success border-opacity-25"
								} pe-5 rounded ps-1 py-1`}
								dateFormat="Pp"
								onChange={(date: Date): void => {
									validateDate(date);
									setDueDate(date);
								}}
								selected={dueDate}
								showTimeSelect
								wrapperClassName={`w-100 ${dateError ? "form-control is-invalid" : "form-control is-valid"}`}
							/>
							{dateError && <Form.Control.Feedback type="invalid">{dateError}</Form.Control.Feedback>}
							<Form.Control.Feedback type="valid">{VALID.dueDate}</Form.Control.Feedback>
						</Form.Group>
					</div>
					<div className="d-flex flex-row-reverse mt-4">
						<Button
							disabled={Object.keys(errors).length > 0 || !!dateError}
							onClick={(): void => {
								changeTasks();
								setEditMode(!editMode);
							}}
						>
							{"Save Changes"}
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};
