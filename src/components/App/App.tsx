import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline/Timeline";
import type {
	Task,
	AssignmentDate,
	UpdateType,
	ToastPayload,
	Error,
	Errors,
	ERROR_OPS,
	ERROR_TYPES,
} from "src/@types";
import { END_DAY_INIT_INCREMENT, SetDateTime } from "../Date/SetDateTime";
import FileImport from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Alert, Col, ToastContainer } from "react-bootstrap";
import AppHeader from "./AppHeader";
import FileDisplay from "../FileDisplay";

import { MIN_FILES_LENGTH } from "../FileDisplay/FileDisplay";
import { findParts, findPoints, parseFileTextToXML, readFile, updateDueDates } from "src/helpers";

import {
	GeneratedToast,
	NOTIFICATION_DEFAULT_DELAY,
	NOTIFICATION_MIN_LENGTH,
	TOAST_CONTAINER_POSITION,
} from "src/helpers/GeneratedToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

/**
 * Root component
 *
 * @returns Main application component
 */
export const App = (): JSX.Element => {
	const [dates, setDates] = React.useState<AssignmentDate>({
		end: new Date(Date.now() + END_DAY_INIT_INCREMENT),
		start: new Date(),
	});
	const [taskArray, setTaskArray] = React.useState<Task[]>([]);
	const [files, setFiles] = React.useState<File[] | undefined>(undefined);
	const [docXML, setDocXML] = React.useState<Document | undefined>(undefined);
	const [fileSelected, setFileSelected] = React.useState<number | undefined>(undefined);
	const [toastMessages, setToastMessages] = React.useState<ToastPayload[]>([]);
	const [errors, setErrors] = React.useState<Errors>({});

	/**
	 * Utility function for updating the errors object via Error object
	 *
	 * @param theType The type of error to append/delete with the errors state
	 * @param operation The type of operation the user is executing
	 * @param error The error to add to the errors state if add operation is selected
	 */
	const updateErrors = (theType: ERROR_TYPES, operation: ERROR_OPS, error?: Error): void => {
		switch (theType) {
			case "date": {
				setErrors({ ...errors, date: operation === "delete" ? undefined : error });
				break;
			}
			case "file": {
				setErrors({ ...errors, file: operation === "delete" ? undefined : error });
				break;
			}
			default:
				break;
		}
	};

	/**
	 * Utility function for removing the notification from the history of notifications
	 * - The reason for the extra implementation is we want to remove the notification from the last of the stack as that is the notification that was just rendered
	 *
	 * @param payload The payload to remove from the notifications
	 */
	const removeNotification = (payload: ToastPayload): void => {
		const clonedToastMessages = [...toastMessages].map((eachToast) => ({ ...eachToast }));
		const payloadFoundIndexes = clonedToastMessages
			.map((eachMessage, index) => (eachMessage.message !== payload.message ? undefined : index))
			.filter((elem) => elem !== undefined);
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- not a magic number
		const lastIndex = payloadFoundIndexes[payloadFoundIndexes.length - 1];
		if (lastIndex) {
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- not a magic number
			clonedToastMessages.splice(lastIndex, 1);
			setToastMessages(clonedToastMessages);
		}
	};

	/**
	 * Utility function for adding notifications to the stack
	 *
	 * @param payload The new message being added to the notification stack
	 */
	const addNotification = (payload: ToastPayload): void => {
		const toastMessagesClone = [...[...toastMessages].map((eachMessage) => ({ ...eachMessage })), payload];
		setToastMessages(toastMessagesClone);
		setTimeout(() => {
			removeNotification(payload);
		}, payload.delay ?? NOTIFICATION_DEFAULT_DELAY);
	};

	/**
	 * Utility function to update the files state from the file display, or any other component that utilizes the files state
	 *
	 * @param type The type of operation to be performed on the files state
	 * @param index The index of the file to operate upon
	 */
	const updateFiles = (type: UpdateType, index: number): void => {
		if (files) {
			switch (type) {
				case "delete": {
					const filesClone = [...files].filter((_, ind) => ind !== index);
					setFiles(filesClone);
					break;
				}
				default: {
					break;
				}
			}
		}
	};

	React.useEffect(() => {
		if (files && fileSelected !== undefined) {
			const currentFile = files[fileSelected];
			const readText = readFile(currentFile);
			parseFileTextToXML(readText)
				.then((result) => setDocXML(result))
				// eslint-disable-next-line no-console -- no logger present yet
				.catch((error) => console.error(error));
			const parts = findParts(readText);
			findPoints(parts)
				.then((tasks) => setTaskArray(updateDueDates(tasks, dates)))
				// eslint-disable-next-line no-console -- no logger present yet
				.catch((err) => console.error(err));
		}
	}, [files, fileSelected, dates]);

	return (
		<>
			{toastMessages && toastMessages.length > NOTIFICATION_MIN_LENGTH && (
				<ToastContainer position={TOAST_CONTAINER_POSITION}>
					{toastMessages.map((eachPayload, index) => (
						<GeneratedToast
							key={`toast-${index}-${eachPayload.message}`}
							{...eachPayload}
						/>
					))}
				</ToastContainer>
			)}
			<div className="d-flex flex-column">
				<AppHeader />
				<div className="d-flex flex-row justify-content-around border-bottom border-opacity-50 pb-5">
					<span>
						<SetDateTime
							addError={(error: Error | undefined, operation: ERROR_OPS): void =>
								updateErrors("date", operation, error)
							}
							addNotification={addNotification}
							assignmentDate={dates}
							update={(theDates: AssignmentDate): void => setDates(theDates)}
						/>
					</span>
					<span className="my-auto">
						<FileDisplay
							currentSelection={fileSelected}
							files={files}
							updateCurrentSelection={(ind: number): void => setFileSelected(ind)}
							updateFiles={updateFiles}
						/>
					</span>
					<FileImport
						files={files}
						update={(theFiles: File[]): void => setFiles(theFiles)}
					/>
				</div>
				{!errors.date && !errors.file ? (
					<>
						{fileSelected !== undefined ? (
							<div className="d-flex flex-row mt-3">
								<Col>
									{files && (
										<Timeline
											assignmentDate={dates}
											fileImported={files.length > MIN_FILES_LENGTH}
											setTaskArray={(tasks: Task[]): void => setTaskArray(tasks)}
											taskArray={taskArray}
										/>
									)}
								</Col>
								<Col lg={5}>
									{files && (
										<DocViewer
											docXML={docXML}
											fileImported={files.length > MIN_FILES_LENGTH}
										/>
									)}{" "}
								</Col>
							</div>
						) : (
							<>
								{files && files.length > MIN_FILES_LENGTH ? (
									<Alert
										className="w-75 mt-4 mx-auto text-center"
										variant="info"
									>
										<FontAwesomeIcon
											className="me-2"
											icon={faCircleInfo}
										/>
										{"Must select a file from the above list to begin timeline generation"}
									</Alert>
								) : (
									<Alert
										className="w-75 mt-4 mx-auto text-center"
										variant="info"
									>
										<FontAwesomeIcon
											className="me-2"
											icon={faCircleInfo}
										/>
										{"Select file(s) from the link "}
										<span className="fw-bold">{" Choose a file "}</span>
										{" or drag-and-drop files into the outlined box to begin timeline generation"}
									</Alert>
								)}
							</>
						)}
					</>
				) : (
					<Alert
						className="w-75 mt-4 mx-auto d-flex flex-column text-center"
						variant="danger"
					>
						<FontAwesomeIcon
							className="me-2"
							icon={faCircleExclamation}
						/>
						<span className="fw-bolder">{"Cannot render Timeline"}</span>
						<span className="mx-auto mt-2">
							<ul>
								{errors.date && <li>{errors.date.message}</li>}
								{errors.file && <li>{errors.file.message}</li>}
							</ul>
						</span>
					</Alert>
				)}
			</div>
		</>
	);
};
