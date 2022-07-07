import React from "react";
import EndDate from "./EndDate";
import StartDate from "./StartDate";

/**
 * Types of props for SetDateTime component
 */
type SetDateTimeProps = {
	/**
	 * The date the assignment is starting
	 */
	startDate: Date;
	/**
	 * Set the date the assignment is starting
	 */
	setStartDate: (theDate: Date) => void;
	/**
	 * The date the assignment is ending
	 */
	endDate: Date;
	/**
	 * Sets the date the assignment is ending
	 */
	setEndDate: (theDate: Date) => void;
};

/**
 * Set Date and Time components on the timeline
 * 
 * @param {SetDateTimeProps} props Passed in properties
 * @returns {JSX.Element} The rendered SetDateTime component
 */
export const SetDateTime = ({
	startDate,
	setStartDate,
	endDate,
	setEndDate,
}: SetDateTimeProps): JSX.Element => {
	return (
		<span className="d-flex flex-row justify-content-between w-50 mx-auto my-3 pb-3">
			<StartDate date={startDate} setDate={setStartDate} />
			<EndDate date={endDate} setDate={setEndDate} />
		</span>
	);
};
