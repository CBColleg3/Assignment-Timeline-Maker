import React from "react";
import { Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import styles from "./StartDate.module.css";

/**
 * Properties of the StartDate component
 */
type StartDateProperties = {
	/**
	 * Function to update the temporary start date coming from the parent component
	 * 
	 * @param _newDate - The temporary start date supplied by the DateModal component
	 */
	updateValue: (_newDate: Date) => void;
	/**
	 * The temporary start date coming from the DateModal component
	 */
	value: Date;
};

/**
 * StartDate is a component which houses the logic to update the start date, and set it as well.
 *
 * @param props The properties passed into the StartDate component
 * @param props.updateValue - The function to update the temporary start date, given the new date `_newDate`
 * @param props.value - The value being supplied by the parent `DateModal` which is the temporary start date
 * @returns The datepicker to update the start date
 */
export const StartDate = ({ updateValue, value }: StartDateProperties): JSX.Element => (
	<div className={"d-flex flex-row p-3 rounded border mb-3"}>
		<span className="fw-bolder fs-6 text-start text-nowrap align-self-center me-3">{"Start Date"}</span>
		<ReactDatePicker
			closeOnScroll
			dateFormat="Pp"
			onChange={(newDate: Date): void => updateValue(newDate)}
			peekNextMonth
			required
			selected={value}
			selectsEnd
			shouldCloseOnSelect
			showTimeSelect
			todayButton={
				<Button
					className={`${styles.today_button}`}
					size="sm"
					variant="outline-primary"
				>
					{"Today"}
				</Button>
			}
			useWeekdaysShort
		/>
	</div>
);
