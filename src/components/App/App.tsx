/* eslint-disable no-mixed-spaces-and-tabs -- prettier/eslint conflict */
/* eslint-disable indent -- prettier/eslint conflict */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline/Timeline";
import type {
	Error,
	Errors,
	ERROR_OPS,
	ERROR_TYPES,
	UpdateType,
	DocumentCacheEntry,
	TaskCacheEntry,
} from "src/@types";
import { SetDateTime } from "../Date/SetDateTime";
import FileImport from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Alert, Col } from "react-bootstrap";
import AppHeader from "./AppHeader";
import FileDisplay from "../FileDisplay";
import { FILE_SELECTED_OUT_OF_BOUNDS_DECREMENTAL, MIN_FILES_LENGTH } from "../FileDisplay/FileDisplay";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { ClimbingBoxLoader, ClockLoader } from "react-spinners";
import { uploadDocument } from "src/helpers/shared/uploadDocument";
import { useAssignmentDateInfoContext, useTaskContext } from "src/context";

/**
 * Root component
 *
 * @returns Main application component
 */
export const App = (): JSX.Element => {
	const { start } = useAssignmentDateInfoContext();
	const { tasks } = useTaskContext();
	const [assignmentCache, setAssignmentCache] = React.useState<{ [key: string]: TaskCacheEntry }>({});
	const [docCollection, setDocCollection] = React.useState<DocumentCacheEntry[]>();
	const [errors, setErrors] = React.useState<Errors>({});
	const [files, setFiles] = React.useState<File[]>([]);
	const [fileSelected, setFileSelected] = React.useState<File | undefined>(undefined);

	const timelineRef: React.RefObject<HTMLSpanElement> = React.createRef();

	React.useEffect(() => {
		console.log(files);
	}, [files]);

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

	/**
	 * Utility function to update the files state from the file display, or any other component that utilizes the files state
	 *
	 * @param type - The type of operation to be performed on the files state
	 * @param index - The index of the file to operate upon
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
						currentSelection={
							files?.length && fileSelected
								? files.findIndex((eachFile) => eachFile.name === fileSelected.name)
								: undefined
						}
						files={files}
						updateCurrentSelection={(ind: number): void => setFileSelected(files?.length ? files[ind] : undefined)}
						updateFiles={(type: UpdateType, ind: number): void => updateFiles(type, ind)}
						uploadDocument={(): void => uploadDocument(timelineRef.current)}
					/>
				</span>
				<FileImport
					files={files}
					update={(theFiles: File[]): void => setFiles(theFiles)}
				/>
			</div>
			{/* {!errors.date && !errors.file ? (
				<>
					{fileSelected !== undefined && files?.length ? (
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
										fileImported={files.length > MIN_FILES_LENGTH}
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
			)} */}
		</div>
	);
};
