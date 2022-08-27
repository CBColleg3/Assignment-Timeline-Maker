/* eslint-disable no-mixed-spaces-and-tabs -- prettier/eslint conflict */
/* eslint-disable indent -- prettier/eslint conflict */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline/Timeline";
import type { Error, Errors, ERROR_OPS, ERROR_TYPES } from "src/@types";
import { SetDateTime } from "../Date/SetDateTime";
import FileImport from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Col } from "react-bootstrap";
import AppHeader from "./AppHeader";
import FileDisplay from "../FileDisplay";

import { ClimbingBoxLoader, ClockLoader } from "react-spinners";
import { useAssignmentDateInfoContext, useTaskContext } from "src/context";
import { useFiles } from "src/hooks";
import { TimelineAlert } from "../TimelineAlert";

const ALERT_CONSTANTS = {
	CANNOT_RENDER_TIMELINE: "Cannot render Timeline",
	CHOOSE_A_FILE: "Choose a file",
	NO_FILE_SELECTED: "Must select a file from the above list to begin timeline generation",
	OR_DRAG_DROP: "or drag-and-drop files into the outlined box to begin timeline generation",
	SELECT_FILE_FROM_LINK: "Select file(s) from the link",
};

/**
 * Root component
 *
 * @returns Main application component
 */
export const App = (): JSX.Element => {
	const { start } = useAssignmentDateInfoContext();
	const { tasks } = useTaskContext();
	const { deleteFile, files, isFileSelected, selectedFileIndex, setFiles, selectFile } = useFiles();
	const [errors, setErrors] = React.useState<Errors>({});

	const timelineRef: React.RefObject<HTMLSpanElement> = React.createRef();

	/**
	 * ERROR MANAGEMENT
	 *
	 * Utility function for updating the errors object via Error object
	 *
	 * @param theType - The type of error to append/delete with the errors state
	 * @param operation - The type of operation the user is executing
	 * @param error - The error to add to the errors state if add operation is selected
	 */
	const updateErrors = React.useCallback(
		(theType: ERROR_TYPES, operation: ERROR_OPS, error?: Error): void => {
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
		},
		[errors],
	);

	return (
		<div className="d-flex flex-column">
			<AppHeader />
			<div className="d-flex flex-row justify-content-around border-bottom border-opacity-50 pb-5 shadow-lg">
				<span>
					<SetDateTime
						addError={(error: Error | undefined, operation: ERROR_OPS): void =>
							updateErrors("date", operation, error)
						}
					/>
				</span>
				<span className="my-auto">
					<FileDisplay
						deleteFile={(index: number): void => deleteFile(index)}
						files={files}
						selectFile={(index: number): void => selectFile(index)}
						selectedFileIndex={selectedFileIndex}
						uploadElementRef={timelineRef.current}
					/>
				</span>
				<FileImport
					files={files}
					update={(theFiles: File[]): void => setFiles(theFiles)}
				/>
			</div>
			{!errors.date && !errors.file ? (
				<>
					{isFileSelected ? (
						<div className="d-flex flex-row pt-3 bg-light shadow">
							<Col>
								{tasks?.length ? (
									<Timeline passRef={timelineRef} />
								) : (
									<div className="w-100 d-flex flex-row justify-content-center">
										<span className="d-flex flex-column">
											<span className="text-dark fw-bold text-opacity-75 fs-6 text-wrap my-3">
												{"Generating Timeline"}
											</span>
											<span className="mx-auto">
												<ClockLoader
													color="#000000"
													loading
												/>
											</span>
										</span>
									</div>
								)}
							</Col>
							<Col lg={5}>
								{document ? (
									<DocViewer
										docXML={document}
										fileImported={isFileSelected}
										startDate={start.date}
										tasks={tasks}
									/>
								) : (
									<div className="w-100 d-flex flex-row justify-content-center">
										<span className="d-flex flex-column">
											<span className="text-primary fw-bold text-opacity-75 fs-6 text-wrap my-3">
												{"Generating Document View"}
											</span>
											<span className="mx-auto">
												<ClimbingBoxLoader
													color="#5050F1"
													loading
												/>
											</span>
										</span>
									</div>
								)}{" "}
							</Col>
						</div>
					) : (
						<>
							{files?.length ? (
								<TimelineAlert
									body={ALERT_CONSTANTS.NO_FILE_SELECTED}
									componentClassName="w-75 mt-4 mx-auto text-center"
									variant="info"
								/>
							) : (
								<TimelineAlert
									body={
										<span>
											{ALERT_CONSTANTS.SELECT_FILE_FROM_LINK}
											<span className="fw-bold mx-1">{ALERT_CONSTANTS.CHOOSE_A_FILE}</span>
											{ALERT_CONSTANTS.OR_DRAG_DROP}
										</span>
									}
									componentClassName="w-75 mt-4 mx-auto text-center"
									variant="info"
								/>
							)}
						</>
					)}
				</>
			) : (
				<TimelineAlert
					body={
						<span className="mx-auto mt-2">
							<ul>
								{errors.date && <li>{errors.date.message}</li>}
								{errors.file && <li>{errors.file.message}</li>}
							</ul>
						</span>
					}
					componentClassName="w-75 mt-4 mx-auto d-flex flex-column text-center"
					title={<span className="fw-bolder">{ALERT_CONSTANTS.CANNOT_RENDER_TIMELINE}</span>}
					variant="danger"
				/>
			)}
		</div>
	);
};
