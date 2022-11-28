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
	startDate: Date;
	/**
	 * The function to update the start date
	 */
	update: (_theDate: Date) => void;
};

/**
 * StartDate is a component which houses the logic to update the start date, and set it as well.
 *
 * @param {StartDateProps} props The properties passed into the StartDate component
 * @returns {JSX.Element} The datepicker to update the start date
 */
export const StartDate = ({ startDate, update }: StartDateProps): JSX.Element => (
	<div className={"d-flex flex-row p-3 rounded border mb-3"}>
		<span className="fw-bolder fs-6 text-start text-nowrap align-self-center me-3">{"Start Date"}</span>
		<ReactDatePicker
			closeOnScroll
			dateFormat="Pp"
			onChange={(date: Date): void => update(date)}
			peekNextMonth
			required
			selected={startDate}
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
