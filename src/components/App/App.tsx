import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline/Timeline";
import type {
	DocCollection,
	Task,
	AssignmentDate,
	UpdateType,
	Error,
	Errors,
	ERROR_OPS,
	ERROR_TYPES,
	TaskCollection,
	TaskCacheEntry,
	iTaskContext,
} from "src/@types";
import { END_DAY_INIT_INCREMENT, SetDateTime } from "../Date/SetDateTime";
import FileImport from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Alert, Col } from "react-bootstrap";
import AppHeader from "./AppHeader";
import FileDisplay from "../FileDisplay";
import { FILE_SELECTED_OUT_OF_BOUNDS_DECREMENTAL, MIN_FILES_LENGTH } from "../FileDisplay/FileDisplay";
import { findParts, findPoints, parseFileTextToXML, readFile, updateDueDates } from "src/helpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { ClimbingBoxLoader, ClockLoader } from "react-spinners";
import { TaskContext } from "src/context";

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
	const [assignmentCache, setAssignmentCache] = React.useState<{ [key: string]: TaskCacheEntry }>({});
	const [taskCollection, setTaskCollection] = React.useState<TaskCollection>();
	const [files, setFiles] = React.useState<File[] | undefined>(undefined);
	const [docCollection, setDocCollection] = React.useState<DocCollection>();
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
					if (filesClone.length === MIN_FILES_LENGTH) {
						setFileSelected(undefined);
					} else if (filesClone.length === index) {
						setFileSelected((oldFileSelected) =>
							oldFileSelected ? oldFileSelected - FILE_SELECTED_OUT_OF_BOUNDS_DECREMENTAL : undefined,
						);
					}
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
			setAssignmentCache((cache) => {
				cache[id] = { tasks: JSON.stringify(taskCollection.tasks), xml: cache[id]?.xml };
				return cache;
			});
		}
	}, [taskCollection]);

	/**
	 * Triggers when docCollection is edited or initialized (aka the document is changed), and updates the cache
	 * to have an entry with filename --> document
	 */
	React.useEffect(() => {
		if (docCollection) {
			const id = docCollection.id;
			setAssignmentCache((cache) => {
				cache[id] = { tasks: cache[id]?.tasks, xml: docCollection.doc };
				return cache;
			});
		}
	}, [docCollection]);

	/**
	 * Triggers when files, fileSelected, dates, or taskCache are changed
	 * - updates docXML data via parsing the file (document editing is not yet supported)
	 * - checks if the cache contains an entry to the current file name (which serves as the key)
	 *   - if it **does** contain an entry, it pulls the data from the cache and sets the task array to that entry, without parsing the document or anything
	 *   - if it **does not** contain an entry with key filename, then it sets the task collection via parsing the document
	 */
	React.useEffect(() => {
		if (files && files.length > MIN_FILES_LENGTH && fileSelected !== undefined) {
			const currentFile: File = files[fileSelected];
			if (assignmentCache[currentFile.name]) {
				setDocCollection({ doc: assignmentCache[currentFile.name].xml, id: currentFile.name });
				setTaskCollection({ id: currentFile.name, tasks: JSON.parse(assignmentCache[currentFile.name].tasks) });
				return;
			}
			const readText = readFile(currentFile);
			parseFileTextToXML(readText)
				.then((result) => setDocCollection({ doc: result, id: currentFile.name }))
				// eslint-disable-next-line no-console -- no logger present yet
				.catch((error) => console.error(error));
			const parts = findParts(readText);
			findPoints(parts)
				.then((tasks) => {
					const parsedTasks = updateDueDates(tasks, dates);
					setTaskCollection({ id: currentFile.name, tasks: parsedTasks });
				})
				// eslint-disable-next-line no-console -- no logger present yet
				.catch((err) => console.error(err));
		}
	}, [files, fileSelected, dates, assignmentCache]);

	/**
	 * Memoized context value, specifies that it will only change value when the taskCollection changes
	 *
	 * useMemo returns a callback, that recognizes that if the input is the same value, it doesn't redo any computations, but returns the saved value
	 * This simply makes sure that we only generate a new context if the taskCollection.tasks changes, and if it doesn't and we re-render, we don't perform the computation again
	 * Also, putting rendering conditionally on an object is a major performance hit, because objects change every re-render due to changing of their location in memory a la similar
	 * to functions signatures, and why if you pass a function directly into state it is required to wrap it in a useCallback to avoid that same trap of re-rendering due to
	 * memory location being different every re-render
	 */
	const taskMemo = React.useMemo(
		() => (): iTaskContext => ({
			setTasks: (newTasks: Task[]) =>
				setTaskCollection((oldCollection) => {
					const oldCollectionTasks = oldCollection?.tasks;
					if (oldCollectionTasks) {
						return { ...oldCollection, tasks: newTasks };
					}
					return oldCollection;
				}),
			tasks: taskCollection?.tasks ?? [],
		}),
		[taskCollection?.tasks],
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
					{fileSelected !== undefined && files && files.length > MIN_FILES_LENGTH ? (
						<div className="d-flex flex-row pt-3 bg-light shadow">
							<Col>
								{taskCollection ? (
									<TaskContext.Provider value={taskMemo()}>
										<Timeline assignmentDate={dates} />
									</TaskContext.Provider>
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
								{docCollection ? (
									<DocViewer
										docXML={docCollection.doc}
										fileImported={files.length > MIN_FILES_LENGTH}
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
			)}
		</div>
	);
};
