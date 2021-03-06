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
	update: (theDate: Date) => void;
};

/**
 * StartDate is a component which houses the logic to update the start date, and set it as well.
 *
 * @param {StartDateProps} props The properties passed into the StartDate component
 * @returns {JSX.Element} The datepicker to update the start date
 */
export const StartDate = ({ startDate, update }: StartDateProps): JSX.Element => (
	<div className={"mx-auto d-flex flex-row mb-3"}>
		<span className="fw-bolder fs-6 text-start text-nowrap my-auto">{"Start Date"}</span>
		<span className="my-auto ms-3">
			<ReactDatePicker
				closeOnScroll
				dateFormat="Pp"
				onChange={update}
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
		</span>
	</div>
);
