import React from "react";
import type { AssignmentDate } from "../../@types/AssignmentDate/AssignmentDate";
import type { UpdateDateType } from "../../@types/AssignmentDate/UpdateDateType";
import EndDate from "./EndDate";
import StartDate from "./StartDate";

/**
 * Types of props for SetDateTime component
 */
type SetDateTimeProps = {
	/**
	 * Propagates the local changes to the parent component
	 */
	update: (dates: AssignmentDate) => void;
};

/**
 * Set Date and Time components on the timeline
 *
 * @param {SetDateTimeProps} props Passed in properties
 * @returns {JSX.Element} The rendered SetDateTime component
 */
export const SetDateTime = ({ update }: SetDateTimeProps): JSX.Element => {
	const [confirm, setConfirm] = React.useState<boolean>(false);
	const [dates, setDates] = React.useState<AssignmentDate>({
		end: new Date(),
		start: new Date(),
	});

	/**
	 * Triggers when dates/confirm is updated
	 * - If the confirm is approved, then we propagate the changes up to the parent component
	 * - Otherwise, no operation occurs
	 */
	React.useEffect(() => {
		if (confirm) {
			update(dates);
			setConfirm(false);
		}
	}, [dates, confirm, update]);

	/**
	 * Helper function to update the start/end date
	 *
	 * @param type Which field the user is updating, either `start` or `end`
	 * @param value The value which is updating the selected field
	 */
	const updateDate = (type: UpdateDateType, value: Date): void => {
		switch (type) {
			case "end": {
				setDates({ ...dates, end: value });
				break;
			}
			case "start": {
				setDates({ ...dates, start: value });
				break;
			}
			default: {
				break;
			}
		}
	};

	return (
		<span className="d-flex flex-row justify-content-between w-50 mx-auto my-3 pb-3">
			<StartDate
				startDate={dates.start}
				update={(value: Date): void => updateDate("start", value)}
			/>
			<EndDate
				endDate={dates.end}
				update={(value: Date): void => updateDate("end", value)}
			/>
		</span>
	);
};
