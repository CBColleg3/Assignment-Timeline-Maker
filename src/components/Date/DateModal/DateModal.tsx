import React from "react";
import { Button, Modal } from "react-bootstrap";
import type { AssignmentDateRange, UpdateDateType } from "src/@types";
import EndDate from "../EndDate";
import StartDate from "../StartDate";

type DateModalProps = {
	assignmentDateRange: AssignmentDateRange;
	isShowing: boolean;
	onClose: () => void;
	title: string;
	updateConfirm: (_confirmValue: boolean) => void;
	updateDates: (_type: UpdateDateType, _value: Date) => void;
};

/**
 * Helper component used to mediate the updating of the start and end date
 *
 * @param {DateModalProps} props The passed in props from the `SetDateTime` component
 * @returns The Modal used to update the start and end date
 */
export const DateModal = ({
	assignmentDateRange,
	isShowing,
	onClose,
	title,
	updateConfirm,
	updateDates,
}: DateModalProps): JSX.Element => {
	const [modalConfirm, setModalConfirm] = React.useState(false);
	return (
		<Modal
			onHide={onClose}
			show={isShowing}
		>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{assignmentDateRange.start && (
					<StartDate
						startDate={assignmentDateRange.start.date}
						update={(value: Date): void => updateDates("start", value)}
					/>
				)}
				{assignmentDateRange.end && (
					<EndDate
						endDate={assignmentDateRange.end.date}
						update={(value: Date): void => updateDates("end", value)}
					/>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={(): void => {
						if (modalConfirm) {
							updateConfirm(true);
							onClose();
							setModalConfirm(false);
						} else {
							setModalConfirm(true);
						}
					}}
					variant={modalConfirm ? "danger" : "primary"}
				>
					{modalConfirm ? "Confirm" : "Change"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
