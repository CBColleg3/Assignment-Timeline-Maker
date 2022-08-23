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
	endDate: Date;
	/**
	 * The function to update the end date
	 */
	update: (_theDate: Date) => void;
};

/**
 * EndDate component, which houses all the logic for gathering and updating the end date
 *
 * @param {EndDateProps} props The props passed into the component
 * @returns {JSX.Element} The datetime component to gather and update the end date
 */
export const EndDate = ({ endDate, update }: EndDateProps): JSX.Element => (
	<div className="d-flex flex-row">
		<span className="fw-bolder fs-6 text-start text-nowrap my-auto">{"End Date"}</span>
		<span className="my-auto ms-2">
			<ReactDatePicker
				closeOnScroll
				dateFormat="Pp"
				onChange={update}
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
		</span>
	</div>
);
