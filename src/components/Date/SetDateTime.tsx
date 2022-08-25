import React from "react";
import { Button } from "react-bootstrap";
import type { UpdateDateType, Error, ERROR_OPS } from "src/@types";
import type { iAssignmentDateInfoContextFormat } from "src/@types/AssignmentDate/iAssignmentDateInfoContextFormat";
import { useAssignmentDateInfoContext } from "src/context";
import { validateSetDateTimeInput } from "src/helpers";
import DateModal from "./DateModal";

/**
 * Types of props for SetDateTime component
 */
type SetDateTimeProps = {
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
const SetDateTime = ({ addError }: SetDateTimeProps): JSX.Element => {
	const { changeFormat, end, format, setEndDate, setStartDate, start } = useAssignmentDateInfoContext();
	const [confirm, setConfirm] = React.useState<boolean>(false);
	const [displayModal, setDisplayModal] = React.useState(false);
	const [tempEnd, setTempEnd] = React.useState(end.date);
	const [tempStart, setTempStart] = React.useState(start.date);

	/**
	 * Triggers when dates/confirm is updated
	 * - If the confirm is approved, then we propagate the changes up to the parent component
	 * - Otherwise, no operation occurs
	 */
	React.useEffect(() => {
		if (confirm) {
			setStartDate(tempStart);
			setEndDate(tempEnd);
			setConfirm(false);
			const error = validateSetDateTimeInput(tempStart, tempEnd);
			if (error) {
				addError({ ...error }, "add");
			} else {
				addError(undefined, "delete");
			}
		}
	}, [addError, confirm, setStartDate, setEndDate, tempStart, tempEnd]);

	/**
	 * Helper function to update the start/end date
	 *
	 * @param type Which field the user is updating, either `start` or `end`
	 * @param value The value which is updating the selected field
	 */
	const updateDate = (type: UpdateDateType, value: Date): void => {
		switch (type) {
			case "end": {
				if (value) {
					setTempEnd(value);
				}
				break;
			}
			case "start": {
				if (value) {
					setTempStart(value);
				}
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
	const updateTimelineType = (type: iAssignmentDateInfoContextFormat): void => {
		switch (type) {
			case "day": {
				changeFormat("day");
				break;
			}
			case "hour": {
				changeFormat("hour");
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
					{format === "day" && <span>{`${start.date.toLocaleDateString()}`}</span>}
					{format === "hour" && (
						<span>{`${start.date.toLocaleTimeString()} ${start.date.toLocaleDateString()}`}</span>
					)}
				</span>
				<span>
					<span className="fw-bold">{"End:  "}</span>
					{format === "day" && <span>{`${end.date.toLocaleDateString()}`}</span>}
					{format === "hour" && (
						<span>{`${end.date.toLocaleTimeString()}  ${end.date.toLocaleDateString()}`}</span>
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
				end={end}
				format={format}
				isShowing={displayModal}
				onClose={(): void => setDisplayModal(false)}
				start={start}
				title="Set Start &amp; End Dates"
				updateConfirm={(confirmValue): void => setConfirm(confirmValue)}
				updateDates={updateDate}
				updateTimelineType={updateTimelineType}
			/>
		</>
	);
};

export { SetDateTime, END_DAY_INIT_INCREMENT };
