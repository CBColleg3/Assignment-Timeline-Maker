import React from "react";
import { Button } from "react-bootstrap";
import type { AssignmentDate, UpdateDateType, Error, ERROR_OPS } from "src/@types";
import { validateSetDateTimeInput } from "src/helpers";
import DateModal from "./DateModal";

/**
 * Types of props for SetDateTime component
 */
type SetDateTimeProps = {
	/**
	 * The current assignment date for the timeline
	 */
	assignmentDate: AssignmentDate;
	/**
	 * Propagates the local changes to the parent component
	 */
	update: (dates: AssignmentDate) => void;
	/**
	 * Adds an error to the stack, disabling user from rendering website
	 */
	addError: (error: Error | undefined, operation: ERROR_OPS) => void;
};

const END_DAY_INIT_INCREMENT = 172800000;

/**
 * Set Date and Time components on the timeline
 *
 * @param {SetDateTimeProps} props Passed in properties
 * @returns {JSX.Element} The rendered SetDateTime component
 */
const SetDateTime = ({ update, assignmentDate, addError }: SetDateTimeProps): JSX.Element => {
	const [confirm, setConfirm] = React.useState<boolean>(false);
	const [dates, setDates] = React.useState<AssignmentDate>(assignmentDate);
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
		<>
			<span className="d-flex flex-column mt-4 h-100 justify-content-around">
				<span className="mb-2">
					<span className="fw-bold">{"Start:  "}</span>
					{`${assignmentDate.start.toLocaleDateString()}  ${assignmentDate.start.toLocaleTimeString()}`}
				</span>
				<span>
					<span className="fw-bold">{"End:  "}</span>
					{`${assignmentDate.end.toLocaleDateString()}  ${assignmentDate.end.toLocaleTimeString()}`}
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
				assignmentDate={dates}
				isShowing={displayModal}
				onClose={(): void => setDisplayModal(false)}
				title="Set Start &amp; End Dates"
				updateConfirm={(confirmValue): void => setConfirm(confirmValue)}
				updateDates={updateDate}
			/>
		</>
	);
};

export { SetDateTime, END_DAY_INIT_INCREMENT };
