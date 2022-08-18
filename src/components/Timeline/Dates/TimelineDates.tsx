import React from "react";
import { Form } from "react-bootstrap";

const SELECT_DATE_STRING = "Select Task Day";
const DAY_STRING = "Day ";
const DAY_IND_INCREMENT = 1;
const BASE_TEN = 10;

type TimelineDatesProps = {
	taskDates: Date[];
	setCurrentTaskDate: (_date: Date) => void;
};

/**
 * Provides a dropdown of timeline dates from the auto generated timeline that you can select to filter each task based on the day.
 *
 * @param {TimelineDatesProps} props The taskDates, curTaskDate, and setter for curTaskDate, as well as the assignment date
 * @returns The timeline date selector
 */
export const TimelineDates = ({ setCurrentTaskDate, taskDates }: TimelineDatesProps): JSX.Element => (
	<div>
		<Form.Group controlId="dateSelect">
			<Form.Label className="text-center w-100">{SELECT_DATE_STRING}</Form.Label>
			<Form.Select
				className="w-50 mx-auto mb-3"
				onChange={(event): void => {
					setCurrentTaskDate(new Date(parseInt(event.target.value, BASE_TEN)));
				}}
			>
				{taskDates.map(
					(taskDate: Date, _ind: number): JSX.Element => (
						<option
							key={`${taskDate.getTime()}`}
							value={`${taskDate.getTime()}`}
						>
							{`${DAY_STRING} ${_ind + DAY_IND_INCREMENT} - ${taskDate.toDateString()}`}
						</option>
					),
				)}
			</Form.Select>
		</Form.Group>
	</div>
);
