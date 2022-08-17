import React from "react";
import { Form } from "react-bootstrap";
import type { AssignmentDate } from "src/@types";

const SELECT_DATE_STRING = "Select Task Day";
const DAY_STRING = "Day ";
const GET_CURRENT_DAY_INDEX = 1;
const ADDING_ONE = 1;

type TimelineDateProps = {
	taskDates: string[];
	curTaskDate: string;
	setCurTaskDate: (_curTaskDate: string) => void;
	assignmentDate: AssignmentDate;
};

/**
 * Provides a dropdown of timeline dates from the auto generated timeline that you can select to filter each task based on the day.
 * @returns
 *
 */
export const TimelineDates = ({
	taskDates,
	curTaskDate,
	setCurTaskDate,
	assignmentDate,
}: TimelineDateProps): JSX.Element => {
	/**
	 *
	 * @param event
	 */
	function updateTaskDate(event: React.ChangeEvent<HTMLSelectElement>): void {
		setCurTaskDate(event.target.value);
	}

	return (
		<div>
			<Form.Group controlId="dateSelect">
				<Form.Label>{SELECT_DATE_STRING}</Form.Label>
				<Form.Select
					onChange={(event): void => {
						updateTaskDate(event);
					}}
					value={curTaskDate}
				>
					{taskDates.map(
						(taskDate: string): JSX.Element => (
							<option
								key={taskDate}
								value={taskDate}
							>
								{DAY_STRING}
								{parseInt(taskDate.split("/")[GET_CURRENT_DAY_INDEX], 10) -
									parseInt(assignmentDate.start.toLocaleDateString().split("/")[GET_CURRENT_DAY_INDEX], 10) +
									ADDING_ONE}{" "}
								{"("} {taskDate}
								{") "}
							</option>
						),
					)}
				</Form.Select>
			</Form.Group>
		</div>
	);
};
