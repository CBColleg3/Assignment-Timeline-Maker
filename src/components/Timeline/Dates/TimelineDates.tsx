import React from "react";
import { Accordion, Form } from "react-bootstrap";
import type { Task } from "src/@types";
import { useTaskContext } from "src/context";
import { calcDayRange, isSameDay } from "src/helpers";

const SELECT_DATE_STRING = "Select Task Day";
const DAY_STRING = "Day ";
const DAY_IND_INCREMENT = 1;
const BASE_TEN = 10;

type TimelineDatesProps = {
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
	currentTaskDate,
	setCurrentTaskDate,
	taskDates,
}: TimelineDatesProps): JSX.Element => {
	const { tasks, setTasks } = useTaskContext();

	return (
		<div>
			<Accordion defaultActiveKey="0">
				{taskDates.map(
					(taskDate: Date, _ind: number): JSX.Element => (
						<Accordion.Item eventKey={`${taskDate.getTime()}`}>
							<Accordion.Header
								key={`${taskDate.getTime()}`}
								onClick={setCurrentTaskDate(taskDate)}
							>
								{`${DAY_STRING} ${_ind + DAY_IND_INCREMENT} - ${taskDate.toDateString()}`}
							</Accordion.Header>
							<Accordion.Body>
								{" "}
								{tasks.map((task: Task) =>
									isSameDay(currentTaskDate, task.dueDate) ? <div className="text-dark">{task.name}</div> : <span />,
								)}
							</Accordion.Body>
						</Accordion.Item>
					),
				)}
			</Accordion>
		</div>
	);
};
