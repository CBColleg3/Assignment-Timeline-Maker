import React from "react";
import { Button } from "react-bootstrap";
import type { AssignmentDate, UpdateDateType, Error, ERROR_OPS, AssignmentDateRange } from "src/@types";
import { validateSetDateTimeInput } from "src/helpers";
import DateModal from "./DateModal";

/**
 * Types of props for SetDateTime component
 */
type SetDateTimeProps = {
	/**
	 * The current assignment date for the timeline
	 */
	assignmentDateRange: AssignmentDateRange;
	/**
	 * Propagates the local changes to the parent component
	 */
	update: (_assignmentDateRange: AssignmentDateRange) => void;
	/**
	 * Adds an error to the stack, disabling user from rendering website
	 */
	addError: (_error: Error | undefined, _operation: ERROR_OPS) => void;
};

const END_DAY_INIT_INCREMENT = 172800000;

/**
 * Set Date and Time components on the timeline
 *
 * @param {SetDateTimeProps} props Passed in properties
 * @returns {JSX.Element} The rendered SetDateTime component
 */
const SetDateTime = ({ update, assignmentDateRange, addError }: SetDateTimeProps): JSX.Element => {
	const [confirm, setConfirm] = React.useState<boolean>(false);
	const [dates, setDates] = React.useState<AssignmentDateRange>(assignmentDateRange);
	const [displayModal, setDisplayModal] = React.useState(false);

	/**
	 * Triggers when dates/confirm is updated
	 * - If the confirm is approved, then we propagate the changes up to the parent component
	 * - Otherwise, no operation occurs
	 */
	React.useEffect(() => {
		if (confirm) {
			update(dates);
			setConfirm(false);
			const error = validateSetDateTimeInput(dates);
			if (error) {
				addError({ ...error }, "add");
			} else {
				addError(undefined, "delete");
			}
		}
	}, [dates, confirm, update, addError]);

	/**
	 * Helper function to update the start/end date
	 *
	 * @param type Which field the user is updating, either `start` or `end`
	 * @param value The value which is updating the selected field
	 */
	const updateDate = (type: UpdateDateType, value: Date): void => {
		switch (type) {
			case "end": {
				if (dates.end) {
					setDates({ ...dates, end: { ...dates.end, date: value } });
				}
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

	/**
	 * Helper function to update the timelinetype
	 *
	 * @param type Which field the user is updating, either `start` or `end`
	 */
	const updateTimelineType = (type: UpdateDateType): void => {
		switch (type) {
			case "day": {
				setDates({ ...dates, timelineType: "day" });
				break;
			}
			case "hour": {
				setDates({ ...dates, timelineType: "time" });
				break;
			}
			default: {
				break;
			}
		}
	};

	return (
		<>
			<span className="d-flex flex-column mt-4 h-100 justify-content-around">
				<span className="mb-2">
					<span className="fw-bold">{"Start:  "}</span>
					{assignmentDate.timelineType === "day" && <span>{`${assignmentDate.start.toLocaleDateString()}`}</span>}
					{assignmentDate.timelineType === "time" && (
						<span>{`${assignmentDate.start.toLocaleTimeString()} ${assignmentDate.start.toLocaleDateString()}`}</span>
					)}
				</span>
				<span>
					<span className="fw-bold">{"End:  "}</span>
					{assignmentDate.timelineType === "day" && <span>{`${assignmentDate.end.toLocaleDateString()}`}</span>}
					{assignmentDate.timelineType === "time" && (
						<span>{`${assignmentDate.end.toLocaleTimeString()}  ${assignmentDate.end.toLocaleDateString()}`}</span>
					)}
				</span>

				<span className="mt-2">
					<Button
						className="w-100"
						onClick={(): void => {
							setDisplayModal(true);
						}}
						size="sm"
						variant="outline-primary"
					>
						{"Update"}
					</Button>
				</span>
			</span>
			<DateModal
				assignmentDateRange={dates}
				isShowing={displayModal}
				onClose={(): void => setDisplayModal(false)}
				title="Set Start &amp; End Dates"
				updateConfirm={(confirmValue): void => setConfirm(confirmValue)}
				updateDates={updateDate}
				updateTimelineType={updateTimelineType}
			/>
		</>
	);
};

export { SetDateTime, END_DAY_INIT_INCREMENT };
