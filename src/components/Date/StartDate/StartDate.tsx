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
export const StartDate = ({ date, setDate }: StartDateProps) => {
	return (
		<div className="w-25 mx-auto d-flex flex-column">
			<span className="my-2 fw-bolder fs-5">Start Date</span>
			<ReactDatePicker
				dateFormat="Pp"
				closeOnScroll
				peekNextMonth
				required
				selectsEnd
				shouldCloseOnSelect
				useWeekdaysShort
				todayButton={
					<Button
						className={`${styles.today_button}`}
						variant="outline-primary"
						size="sm"
					>
						Today
					</Button>
				}
				showTimeSelect
				selected={date}
				onChange={setDate}
			/>
		</div>
	);
};
