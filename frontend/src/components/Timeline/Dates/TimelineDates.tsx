import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Accordion } from "react-bootstrap";
import type { AssignmentDate, Task } from "src/@types";
import { useAssignmentDateInfoContext, useTaskContext } from "src/context";
import { isSameDay, isSameFuncGenerator, truncateText } from "src/helpers";
import { doesDateContainTasks } from "src/helpers/AssignmentDateInfo/doesDateContainTasks";
import styles from "./TimelineDates.module.css";

/**
 * TimelineDates constant values
 */
const CONSTANTS = {
	/**
	 * Increment utilized when displaying the hour/day count, increment index + 1, hour index 0 --> hour (0 + 1) --> hour 1
	 */
	DAY_IND_INCREMENT: 1,
	/**
	 * Constant string we interpolate into the incremented day index
	 */
	DAY_STRING: "Day ",
	/**
	 * Constant string we interpolate into the incremented hour index
	 */
	HOUR_STRING: "Hour ",
	/**
	 * The maximum length of a task description, description is truncated at 75 characters
	 */
	TASK_DESC_LENGTH: 75,
};

/**
 * Provides a dropdown of timeline dates from the auto generated timeline that you can select to filter each task based on the day.
 *
 * @returns The timeline date selector
 */
export const TimelineDates = (): JSX.Element => {
	const { currentSelectedDate, dates, format, setCurrentlySelectedDate } = useAssignmentDateInfoContext();
	const { tasks } = useTaskContext();

	return (
		<div>
			<Accordion
				className={`mx-auto ${styles.task_table_contents_header}`}
				flush
			>
				<Accordion.Item eventKey="reset_current_selected_date">
					<Accordion.Header
						onClick={(): void => {
							setCurrentlySelectedDate(undefined);
						}}
					>
						<div className="d-flex flex-row">
							<span className={currentSelectedDate === undefined ? "text-primary fw-bold" : ""}>
								{"Display all Tasks"}
							</span>
							<div className="ps-2">
								{currentSelectedDate === undefined ? (
									<FontAwesomeIcon
										color="blue"
										icon={faCircleCheck}
									/>
								) : (
									<FontAwesomeIcon
										color="DarkGray"
										icon={faCircle}
									/>
								)}
							</div>
						</div>
					</Accordion.Header>
				</Accordion.Item>
				{dates
					.map((eachAssignmentDate: AssignmentDate) => eachAssignmentDate.date)
					.filter((eachDate: Date) => doesDateContainTasks(eachDate, tasks, format))
					.map((taskDate: Date, _ind: number): JSX.Element => {
						const currentlySelected = taskDate.getTime() === currentSelectedDate?.date.getTime();
						const containsTasks = tasks.filter((eachTask) => isSameDay(eachTask.dueDate, taskDate)).length > 0;
						return containsTasks ? (
							<Accordion.Item
								eventKey={`${taskDate.getTime()}`}
								key={`element-${taskDate.toDateString()}-${_ind}`}
							>
								<Accordion.Header
									key={`${taskDate.getTime()}`}
									onClick={(): void => {
										setCurrentlySelectedDate(dates[_ind]);
									}}
								>
									<div className="d-flex flex-row">
										{format === "day" && (
											<span className={currentlySelected ? "text-primary fw-bold" : ""}>
												{`${CONSTANTS.DAY_STRING} ${
													_ind + CONSTANTS.DAY_IND_INCREMENT
												} - ${taskDate.toDateString()}`}
											</span>
										)}
										{format === "hour" && (
											<span className={currentlySelected ? "text-primary fw-bold" : ""}>
												{`${CONSTANTS.HOUR_STRING} ${
													_ind + CONSTANTS.DAY_IND_INCREMENT
												} -${taskDate.toLocaleDateString()} ${taskDate.toLocaleTimeString()}`}
											</span>
										)}

										<div className="ps-2">
											{currentlySelected ? (
												<FontAwesomeIcon
													color="blue"
													icon={faCircleCheck}
												/>
											) : (
												<FontAwesomeIcon
													color="DarkGray"
													icon={faCircle}
												/>
											)}
										</div>
									</div>
								</Accordion.Header>
								<Accordion.Body
									className={`${currentlySelected ? "text-primary" : "text-dark"} d-flex flex-column`}
								>
									{tasks
										.filter((eachTask) => isSameFuncGenerator(format)(eachTask.dueDate, currentSelectedDate?.date))
										.map((eachTask: Task, _taskInd) => (
											<a
												className="text-decoration-none my-2"
												href={`#${eachTask.name}-${eachTask.id}`}
												key={`${eachTask.name}-${_taskInd}`}
											>
												{`\u2022 ${truncateText(
													`${eachTask.name} - ${eachTask.description}`,
													CONSTANTS.TASK_DESC_LENGTH,
												)}`}
											</a>
										))}
								</Accordion.Body>
							</Accordion.Item>
						) : (
							<span key={`element-${taskDate.toDateString()}-${_ind}`} />
						);
					})}
			</Accordion>
		</div>
	);
};
