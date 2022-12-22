import React from "react";
import { Form } from "react-bootstrap";
import type { iAssignmentDateInfoContextFormat } from "src/@types";

/**
 * The properties of the DateFormat component
 */
type DateFormatProperties = {
	/**
	 * The callback function to update the value being passed in as a prop from SetDateTime
	 */
	updateValue: (_newFormat: iAssignmentDateInfoContextFormat) => void;
	/**
	 * The value that the input is given, via SetDateTime component
	 */
	value: iAssignmentDateInfoContextFormat;
};

/**
 * The DateFormat component, which controls the format of the date
 * 
 * @param props - The properties of the DateFormat component
 * @param props.updateValue - The callback function to update the value being passed in as a prop from SetDateTime
 * @param props.value - The value that the input is given, via SetDateTime component
 * @returns - The DateFormat component, which is a series of checks that change the format of the AssignmentDate
 */
export const DateFormat = ({ updateValue, value }: DateFormatProperties): JSX.Element => (
	<>
		<Form.Check
			checked={value === "day"}
			label="Day"
			name="timelineType"
			onChange={(): void => {
				updateValue("day");
			}}
			type="radio"
			value="day"
		/>
		<Form.Check
			checked={value === "hour"}
			label="Hour"
			name="timelineType"
			onChange={(): void => {
				updateValue("hour");
			}}
			type="radio"
			value="time"
		/>
	</>
);
