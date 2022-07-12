import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline/Timeline";
import type { Task } from "../../@types/Task";
import { SetDateTime } from "../Date/SetDateTime";
import FileImport from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Col, ToastContainer } from "react-bootstrap";
import AppHeader from "./AppHeader";
import type { AssignmentDate } from "../../@types/AssignmentDate/AssignmentDate";
import FileDisplay from "../FileDisplay";
import type { UpdateType } from "src/@types/FileDisplay/UpdateType";
import { MIN_FILES_LENGTH } from "../FileDisplay/FileDisplay";
import { findParts, findPoints, parseFileTextToXML, readFile, updateDueDates } from "src/helpers";
import type { ToastPayload } from "src/@types/Toast/ToastPayload";
import { generateToast, NOTIFICATION_MIN_LENGTH, TOAST_CONTAINER_POSITION } from "src/helpers/generateToast";
import type { Errors } from "src/@types/Errors/Errors";

/**
 * Root component
 *
 * @returns Main application component
 */
export const App = (): JSX.Element => {
	const [dates, setDates] = React.useState<AssignmentDate>({ end: new Date(), start: new Date() });
	const [taskArray, setTaskArray] = React.useState<Task[]>([]);
	const [files, setFiles] = React.useState<File[] | undefined>(undefined);
	const [docXML, setDocXML] = React.useState<Document | undefined>(undefined);
	const [fileSelected, setFileSelected] = React.useState<number | undefined>(undefined);
	const [toastMessages, setToastMessages] = React.useState<ToastPayload[]>([]);
	const [errors, setErrors] = React.useState<Errors>({});

	/**
	 * Utility function for updating the errors object via Error object
	 *
	 * @param error The error to add to the errors state
	 */
	const updateError = (error: Error): void => {
		const clonedErrors = { ...errors, error };
		setErrors(clonedErrors);
	};

	/**
	 * Utility function for adding notifications to the stack
	 *
	 * @param payload The new message being added to the notification stack
	 */
	const addNotification = (payload: ToastPayload): void => {
		const toastMessagesClone = [...[...toastMessages].map((eachMessage) => ({ ...eachMessage })), payload];
		setToastMessages(toastMessagesClone);
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
					{toastMessages.map((eachPayload) => generateToast({ ...eachPayload }))}
				</ToastContainer>
			)}
			<div className="d-flex flex-column">
				<AppHeader />
				<div className="d-flex flex-row justify-content-around border-bottom border-opacity-50 pb-5">
					<span>
						<SetDateTime
							addError={(error: Error): void => updateError(error)}
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
			</div>
		</>
	);
};
