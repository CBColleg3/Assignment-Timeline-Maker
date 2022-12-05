import React from "react";
import { Button } from "react-bootstrap";
import type { iAssignmentDateInfoContextFormat } from "src/@types";
import { Divider } from "src/common/components/Divider/Divider";
import { useAssignmentDateInfoContext } from "src/context";
import { DateModal } from "./DateModal";
import styles from "./SetDateTime.module.css";

/**
 * The amount of milliseconds we increment the time of the end day
 */
const END_DAY_INIT_INCREMENT = 172800000;

/**
 * Returns the stringified date according to the Timeline's AssignmentDate format
 *
 * @param date - The date being passed in to be displayed
 * @param fmt - The current format of the dates
 * @returns The formatted date output in accordance with the timeline format
 */
const formatOutput = (date: Date, fmt: iAssignmentDateInfoContextFormat): string =>
	fmt === "day" ? date.toLocaleDateString() : `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;

/**
 * Set Date and Time components on the timeline
 *
 * @returns The rendered SetDateTime component
 */
const SetDateTime = (): JSX.Element => {
	const { end, format, start } = useAssignmentDateInfoContext();
	const [showModal, setShowModal] = React.useState<boolean>(false);

	return (
		<>
			<div className={`d-flex flex-column justify-content-center align-items-center ${styles.select_date}`}>
				<div className={`${styles.date_times}`}>
					<div className="d-flex flex-column">
						<div className="fw-bold text-center">{"Start "}</div>
						<div>{formatOutput(start.date, format)}</div>
					</div>
					<div className="d-flex flex-column">
						<div className="text-center fw-bold">{"End "}</div>
						<div>{formatOutput(end.date, format)}</div>
					</div>
				</div>
				<Divider classNameOverride="w-75" />
				<Button
					className={`w-25 rounded-pill ${styles.date_section_button}`}
					onClick={(): void => {
						setShowModal(true);
					}}
					size="sm"
					variant="outline-primary"
				>
					{"Update"}
				</Button>
				<div className={`position-absolute ${styles.date_section_header}`}>{"Dates"}</div>
			</div>
			{showModal && (
				<DateModal
					closeModal={(): void => setShowModal(false)}
					title="Start &amp; End Dates"
				/>
			)}
		</>
	);
};

export { SetDateTime, END_DAY_INIT_INCREMENT };
