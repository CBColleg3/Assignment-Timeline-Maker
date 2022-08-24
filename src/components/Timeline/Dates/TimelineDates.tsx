import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Accordion } from "react-bootstrap";
import type { AssignmentDate, Task } from "src/@types";
import { useTaskContext } from "src/context";
import { isSameDay, truncateText } from "src/helpers";
import styles from "./TimelineDates.module.css";

const CONSTANTS = {
	DAY_IND_INCREMENT: 1,
	DAY_STRING: "Day ",
	HOUR_STRING: "Hour ",
	TASK_DESC_LENGTH: 75,
};

type TimelineDatesProps = {
	assignmentDate: AssignmentDate;
	taskDates: Date[];
	currentTaskDate: Date;
	setCurrentTaskDate: (_date: Date) => void;
};

/**
 * Provides a dropdown of timeline dates from the auto generated timeline that you can select to filter each task based on the day.
 *
 * @param {TimelineDatesProps} props The taskDates, curTaskDate, and setter for curTaskDate, as well as the assignment date
 * @returns The timeline date selector
 */
export const TimelineDates = ({
	assignmentDate,
	currentTaskDate,
	setCurrentTaskDate,
	taskDates,
}: TimelineDatesProps): JSX.Element => {
	const { tasks } = useTaskContext();

	return (
		<div>
			<Accordion
				className={`mx-auto ${styles.task_table_contents_header}`}
				flush
			>
				{taskDates.map((taskDate: Date, _ind: number): JSX.Element => {
					const currentlySelected = taskDate.getTime() === currentTaskDate.getTime();
					return (
						<Accordion.Item
							eventKey={`${taskDate.getTime()}`}
							key={`element-${taskDate.toDateString()}-${_ind}`}
						>
							<Accordion.Header
								key={`${taskDate.getTime()}`}
								onClick={(): void => {
									setCurrentTaskDate(taskDate);
								}}
							>
								<div className="d-flex flex-row">
									{assignmentDate.timelineType === "day" && (
										<span className={currentlySelected ? "text-primary fw-bold" : ""}>
											{`${CONSTANTS.DAY_STRING} ${_ind + CONSTANTS.DAY_IND_INCREMENT} - ${taskDate.toDateString()}`}
										</span>
									)}
									{assignmentDate.timelineType === "time" && (
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
							<Accordion.Body className={`${currentlySelected ? "text-primary" : "text-dark"} d-flex flex-column`}>
								{tasks
									.filter((eachTask) => isSameDay(eachTask.dueDate, currentTaskDate))
									.map((eachTask: Task, _taskInd) => (
										<a
											className="text-decoration-none my-2"
											href={`#${eachTask.name}-${eachTask.id}`}
											key={`${eachTask.name}-${_taskInd}`}
										>
											{`\u2022 ${truncateText(`${eachTask.name} - ${eachTask.document}`, CONSTANTS.TASK_DESC_LENGTH)}`}
										</a>
									))}
							</Accordion.Body>
						</Accordion.Item>
					);
				})}
			</Accordion>
		</div>
	);
};
