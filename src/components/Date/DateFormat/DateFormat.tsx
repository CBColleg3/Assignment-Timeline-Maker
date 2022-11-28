import React from "react";
import { Form } from "react-bootstrap";
import type { iAssignmentDateInfoContextFormat } from "src/@types";
import { useAssignmentDateInfoContext } from "src/context";

type DateFormatProperties = {
	updateValue: (_newFormat: iAssignmentDateInfoContextFormat) => void;
	value: iAssignmentDateInfoContextFormat;
};

/**
 *
 * @returns
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
