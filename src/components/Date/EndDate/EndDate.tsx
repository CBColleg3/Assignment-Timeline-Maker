import React from "react";
import { Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import styles from "./EndDate.module.css";

/**
 * EndDate's prop types
 */
type EndDateProperties = {
	/**
	 * The current end date
	 */
	endDate: Date;
	/**
	 * The function to update the start date
	 */
	update: (_theDate: Date) => void;
};

/**
 * EndDate is a component which houses the logic to update the end date, and set it as well.
 *
 * @param {EndDateProperties} props The properties passed into the EndDate component
 * @returns {JSX.Element} The datepicker to update the end date
 */
export const EndDate = ({ endDate, update }: EndDateProperties): JSX.Element => (
	<div className={"d-flex flex-row p-3 rounded border mb-3"}>
		<span className="fw-bolder fs-6 text-start text-nowrap align-self-center me-3">{"End Date"}</span>
		<ReactDatePicker
			closeOnScroll
			dateFormat="Pp"
			onChange={(date: Date): void => update(date)}
			peekNextMonth
			required
			selected={endDate}
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
