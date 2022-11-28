import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import type { UpdateDateType, iAssignmentDateInfoContextFormat } from "src/@types";
import { EndDate } from "../EndDate";
import { StartDate } from "../StartDate";

type DateModalProps = {
	end: Date;
	format: iAssignmentDateInfoContextFormat;
	isShowing: boolean;
	onClose: () => void;
	start: Date;
	title: string;
	updateConfirm: (_confirmValue: boolean) => void;
	updateDates: (_type: UpdateDateType, _value: Date) => void;
	updateTimelineType: (_type: iAssignmentDateInfoContextFormat) => void;
};

/**
 * Helper component used to mediate the updating of the start and end date
 *
 * @param {DateModalProps} props The passed in props from the `SetDateTime` component
 * @returns The Modal used to update the start and end date
 */
export const DateModal = ({
	end,
	format,
	isShowing,
	onClose,
	start,
	title,
	updateConfirm,
	updateDates,
	updateTimelineType,
}: DateModalProps): JSX.Element => {
	const [modalConfirm, setModalConfirm] = React.useState(false);

	return (
		<Modal
			onHide={(): void => onClose()}
			show={isShowing}
		>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<StartDate
					startDate={start}
					update={(value: Date): void => updateDates("start", value)}
				/>
				<EndDate
					endDate={end}
					update={(value: Date): void => updateDates("end", value)}
				/>
				<span>
					<Form.Check
						checked={format === "day"}
						label="Day"
						name="timelineType"
						onChange={(): void => {
							updateTimelineType("day");
						}}
						type="radio"
						value="day"
					/>
					<Form.Check
						checked={format === "hour"}
						label="Hour"
						name="timelineType"
						onChange={(): void => {
							updateTimelineType("hour");
						}}
						type="radio"
						value="time"
					/>
				</span>
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
