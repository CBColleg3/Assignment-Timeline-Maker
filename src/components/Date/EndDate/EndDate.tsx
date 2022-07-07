import React from "react";
import { Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import styles from "./EndDate.module.css";

/**
 * EndDate's prop types
 */
type EndDateProps = {
	/**
	 * The current end date
	 */
	date: Date;
	/**
	 * The function to update the end date
	 */
	setDate: (theDate: Date) => void;
};

/**
 * EndDate component, which houses all the logic for gathering and updating the end date
 * 
 * @param {EndDateProps} props The props passed into the component
 * @returns {JSX.Element} The datetime component to gather and update the end date
 */
export const EndDate = ({ date, setDate }: EndDateProps) => {
	return (
		<div className="w-25 mx-auto d-flex flex-column">
			<span className="my-2 fw-bolder fs-5">End Date</span>
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
