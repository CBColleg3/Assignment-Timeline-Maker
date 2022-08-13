import React from "react";
import { Form } from "react-bootstrap";

const SELECT_DATE_STRING = "Select Task Day";

type TimelineDateProps = {
	taskDates: string[];
	curTaskDate: string;
	setCurTaskDate: (_curTaskDate: string) => void;
};

/**
 * Provides a dropdown of timeline dates from the auto generated timeline that you can select to filter each task based on the day.
 * @returns
 *
 */
export const TimelineDates = ({ taskDates, curTaskDate, setCurTaskDate }: TimelineDateProps): JSX.Element => {
	/**
	 *
	 * @param event
	 */
	function updateTaskDate(event: React.ChangeEvent<HTMLSelectElement>): void {
		setCurTaskDate(event.target.value);
	}

	return (
		<div>
			<Form.Group controlId="userEmotions">
				<Form.Label>{SELECT_DATE_STRING}</Form.Label>
				<Form.Select
					onChange={updateTaskDate}
					value={curTaskDate}
				>
					{taskDates.map(
						(taskDate: string): JSX.Element => (
							<option
								key={taskDate}
								value={taskDate}
							>
								{" "}
								{taskDate}{" "}
							</option>
						),
					)}
				</Form.Select>
			</Form.Group>
		</div>
	);
};
