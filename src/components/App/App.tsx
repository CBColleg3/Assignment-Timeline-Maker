import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline/Timeline";
import type {
	Task,
	AssignmentDate,
	UpdateType,
	Error,
	Errors,
	ERROR_OPS,
	ERROR_TYPES,
	TaskCollection,
} from "src/@types";
import { END_DAY_INIT_INCREMENT, SetDateTime } from "../Date/SetDateTime";
import FileImport from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Alert, Col } from "react-bootstrap";
import AppHeader from "./AppHeader";
import FileDisplay from "../FileDisplay";
import { MIN_FILES_LENGTH } from "../FileDisplay/FileDisplay";
import { findParts, findPoints, parseFileTextToXML, readFile, updateDueDates } from "src/helpers";

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
	const [taskCache, setTaskCache] = React.useState<{ [key: string]: string }>({});
	const [taskCollection, setTaskCollection] = React.useState<TaskCollection>();
	const [files, setFiles] = React.useState<File[] | undefined>(undefined);
	const [docXML, setDocXML] = React.useState<Document | undefined>(undefined);
	const [fileSelected, setFileSelected] = React.useState<number | undefined>(undefined);
	const [errors, setErrors] = React.useState<Errors>({});

	/**
	 * Utility function for updating the errors object via Error object
	 *
	 * @param theType - The type of error to append/delete with the errors state
	 * @param operation - The type of operation the user is executing
	 * @param error - The error to add to the errors state if add operation is selected
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
	 * Utility function to update the current task collection state
	 *
	 * @param tasks - The new tasks to update the current task collection with
	 */
	const updateTaskCollection = (tasks: Task[]): void => {
		if (taskCollection) {
			const newTaskCollection: TaskCollection = {
				...taskCollection,
				tasks,
			};
			setTaskCollection(newTaskCollection);
		}
	};

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

	/**
	 * Triggers when taskCollection is edited or initialized (aka the tasks are changed), and updates the taskCache
	 * to have an entry with filename --> stringified tasks
	 */
	React.useEffect(() => {
		if (taskCollection) {
			const id = taskCollection?.id;
			setTaskCache((cache) => {
				cache[id] = JSON.stringify(taskCollection.tasks);
				return cache;
			});
		}
	}, [taskCollection]);

	/**
	 * Triggers when files, fileSelected, dates, or taskCache are changed
	 * - updates docXML data via parsing the file (document editing is not yet supported)
	 * - checks if the cache contains an entry to the current file name (which serves as the key)
	 *   - if it **does** contain an entry, it pulls the data from the cache and sets the task array to that entry, without parsing the document or anything
	 *   - if it **does not** contain an entry with key filename, then it sets the task collection via parsing the document
	 */
	React.useEffect(() => {
		if (files && fileSelected !== undefined) {
			const currentFile: File = files[fileSelected];
			const readText = readFile(currentFile);
			parseFileTextToXML(readText)
				.then((result) => setDocXML(result))
				// eslint-disable-next-line no-console -- no logger present yet
				.catch((error) => console.error(error));
			if (taskCache[currentFile.name]) {
				setTaskCollection({ id: currentFile.name, tasks: JSON.parse(taskCache[currentFile.name]) });
				return;
			}
			const parts = findParts(readText);
			findPoints(parts)
				.then((tasks) => {
					const parsedTasks = updateDueDates(tasks, dates);
					setTaskCollection({ id: currentFile.name, tasks: parsedTasks });
				})
				// eslint-disable-next-line no-console -- no logger present yet
				.catch((err) => console.error(err));
		}
	}, [files, fileSelected, dates, taskCache]);

	return (
		<div className="d-flex flex-column">
			<AppHeader />
			<div className="d-flex flex-row justify-content-around border-bottom border-opacity-50 pb-5">
				<span>
					<SetDateTime
						addError={(error: Error | undefined, operation: ERROR_OPS): void =>
							updateErrors("date", operation, error)
						}
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
										setTaskArray={(tasks: Task[]): void => updateTaskCollection(tasks)}
										taskArray={taskCollection?.tasks ?? []}
									/>
								)}
							</Col>
							<Col lg={5}>
								{files && (
									<DocViewer
										docXML={docXML}
										fileImported={files.length > MIN_FILES_LENGTH}
										tasks={taskCollection?.tasks ?? []}
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
	);
};
