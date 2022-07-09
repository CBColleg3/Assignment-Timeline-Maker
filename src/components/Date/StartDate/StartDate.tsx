import React from "react";
import { Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import styles from "./StartDate.module.css";

/**
 * StartDate's prop types
 */
type StartDateProps = {
	/**
	 * The current start date
	 */
	date: Date;
	/**
	 * The function to update the start date
	 */
	setDate: (theDate: Date) => void;
};

/**
 * StartDate is a component which houses the logic to update the start date, and set it as well.
 * 
 * @param {StartDateProps} props The properties passed into the StartDate component
 * @returns {JSX.Element} The datepicker to update the start date
 */
export const StartDate = ({ date, setDate }: StartDateProps): JSX.Element => (
	<div className={"w-25 mx-auto d-flex flex-column react-datepicker-container"}>
		<span className="my-2 fw-bolder fs-5 text-center">{"Start Date"}</span>
		<ReactDatePicker
			closeOnScroll
			dateFormat="Pp"
			onChange={setDate}
			peekNextMonth
			required
			selected={date}
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
