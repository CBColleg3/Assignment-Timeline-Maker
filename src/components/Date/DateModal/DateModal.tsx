import React from "react";
import { Button, Modal } from "react-bootstrap";
import type { iAssignmentDateInfoContextFormat } from "src/@types";
import { useAssignmentDateInfoContext } from "src/context";
import { addToast, generateErrorToast, generateSuccessToast } from "src/helpers";
import { DateFormat } from "../DateFormat/DateFormat";
import { EndDate } from "../EndDate";
import { StartDate } from "../StartDate";

/**
 * Properties of the DateModal component
 */
type DateModalProps = {
	/**
	 * The function to close the modal, which updates the boolean from it's parent that is conditionally rendering it
	 */
	closeModal: () => void;
	/**
	 * The title of the DateModal
	 */
	title: string;
};

/**
 * Helper component used to mediate the updating of the start and end date
 *
 * @param props The passed in props from the `SetDateTime` component
 * @param props.closeModal - The function to trigger on/off the conditional rendering of the DateModal
 * @param props.title - The title of the DateModal
 * @returns The Modal used to update the start and end date
 */
export const DateModal = ({ closeModal, title }: DateModalProps): JSX.Element => {
	const { changeFormat, end, format, start, setEnd, setStart, setChangingFormat } =
		useAssignmentDateInfoContext();
	const [newStart, setNewStart] = React.useState<Date>(start.date);
	const [newEnd, setNewEnd] = React.useState<Date>(end.date);
	const [newFormat, setNewFormat] = React.useState<iAssignmentDateInfoContextFormat>(format);

	const [showing, setShowing] = React.useState<boolean>(true);
	const [modalConfirm, setModalConfirm] = React.useState(false);

	return (
		<Modal
			onHide={(): void => {
				closeModal();
				setShowing(false);
			}}
			show={showing}
		>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<StartDate
					updateValue={(newStartDate: Date): void => setNewStart(newStartDate)}
					value={newStart}
				/>
				<EndDate
					updateValue={(newEndDate: Date): void => setNewEnd(newEndDate)}
					value={newEnd}
				/>
				<div className="d-flex flex-column border p-2 rounded">
					<div className="fw-bolder fs-6 mb-2">{"Date Format"}</div>
					<DateFormat
						updateValue={(newFormatSpec: iAssignmentDateInfoContextFormat): void =>
							setNewFormat(newFormatSpec)
						}
						value={newFormat}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={(): void => {
						if (modalConfirm) {
							let success = false;
							let failure = false;
							const failureMessage = document.createElement("ul");
							if (newStart.getTime() > newEnd.getTime()) {
								failure = true;
								failureMessage.innerHTML = "<li>Start time must be before End time</li>";
							}
							if (newEnd.getTime() < newStart.getTime()) {
								failure = true;
								failureMessage.innerHTML = `${failureMessage.innerHTML}<li>End Time must be after Start Time</li>`;
							}
							if (Math.abs(newStart.getFullYear() - newEnd.getFullYear()) > 99) {
								failure = true;
								failureMessage.innerHTML = `${failureMessage.innerHTML}<li>End Time and Start Time cannot be more than 99 years apart`;
							}
							if (!failure && start.date.getTime() !== newStart.getTime()) {
								setStart({ ...start, date: newStart });
								success = true;
							}
							if (!failure && end.date.getTime() !== newEnd.getTime()) {
								setEnd({ ...end, date: newEnd });
								success = true;
							}
							if (!failure && format !== newFormat) {
								changeFormat(newFormat);
								setChangingFormat(true);
								success = true;
							}
							setModalConfirm(false);
							setShowing(false);
							closeModal();
							success && addToast(generateSuccessToast("Date Notification", "Successfully updated the dates!"));
							failure && addToast(generateErrorToast("Date Notification", failureMessage));
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
