import React from "react";
import { Button, Modal } from "react-bootstrap";
import type { iAssignmentDateInfoContextFormat } from "src/@types";
import { useAssignmentDateInfoContext } from "src/context";
import { addToast, generateSuccessToast } from "src/helpers";
import { DateFormat } from "../DateFormat/DateFormat";
import { EndDate } from "../EndDate";
import { StartDate } from "../StartDate";

type DateModalProps = {
	closeModal: () => void;
	title: string;
};

/**
 * Helper component used to mediate the updating of the start and end date
 *
 * @param {DateModalProps} props The passed in props from the `SetDateTime` component
 * @returns The Modal used to update the start and end date
 */
export const DateModal = ({ closeModal, title }: DateModalProps): JSX.Element => {
	const { changeFormat, end, format, start, setEnd, setStart } = useAssignmentDateInfoContext();
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
							console.info(`--Confirming change--\nStart: ${newStart}\nEnd: ${newEnd}\nFormat: ${newFormat}`);
							if (start.date.getTime() !== newStart.getTime()) {
								setStart({ ...start, date: newStart });
								success = true;
							}
							if (end.date.getTime() !== newEnd.getTime()) {
								setEnd({ ...end, date: newEnd });
								success = true;
							}
							if (format !== newFormat) {
								changeFormat(newFormat);
								success = true;
							}
							setModalConfirm(false);
							setShowing(false);
							closeModal();
							success && addToast(generateSuccessToast("Date Notification", "Successfully updated the dates!"));
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
