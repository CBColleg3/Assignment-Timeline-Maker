/* eslint-disable no-mixed-spaces-and-tabs -- prettier/eslint conflict */
/* eslint-disable indent -- prettier/eslint conflict */
/* eslint-disable @typescript-eslint/no-magic-numbers */
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
	iTaskContext,
	DocumentCacheEntry,
	AssignmentDateRange,
	UpdateDateType,
} from "src/@types";
import { SetDateTime } from "../Date/SetDateTime";
import FileImport from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Alert, Col } from "react-bootstrap";
import AppHeader from "./AppHeader";
import FileDisplay from "../FileDisplay";
import { FILE_SELECTED_OUT_OF_BOUNDS_DECREMENTAL, MIN_FILES_LENGTH } from "../FileDisplay/FileDisplay";
import {
	assignDatesRank,
	findParts,
	findPoints,
	generateInitialAssignmentDate,
	getIndexOfSelectedDateInDates,
	parseFileTextToXML,
	readFile,
	updateDueDates,
} from "src/helpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { ClimbingBoxLoader, ClockLoader } from "react-spinners";
import { TaskContext } from "src/context";
import { generateAssignmentDatesFromStartEnd } from "src/helpers/SetDateTime/generateAssignmentDatesFromStartEnd";
import { uploadDocument } from "src/helpers/shared/uploadDocument";

const MS_IN_DAY = 86400000;

/**
 * Root component
 *
 * @returns Main application component
 */
export const App = (): JSX.Element => {
	const [assignmentDateRange, setAssignmentDateRange] = React.useState<AssignmentDateRange>(
		generateInitialAssignmentDate(),
	);

	const [documentCache, setDocumentCache] = React.useState<DocumentCacheEntry[]>();
	const [document, setDocument] = React.useState<Document>();
	const [tasks, setTasks] = React.useState<Task[]>([]);
	const [errors, setErrors] = React.useState<Errors>({});
	const [files, setFiles] = React.useState<File[] | undefined>(undefined);
	const [fileSelected, setFileSelected] = React.useState<number | undefined>(undefined);

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

	/**
	 * FILE MANAGEMENT
	 *
	 * Utility function to update the files state from the file display, or any other component that utilizes the files state
	 *
	 * @param type - The type of operation to be performed on the files state
	 * @param index - The index of the file to operate upon
	 */
	const updateFiles = React.useCallback(
		(type: UpdateType, index: number): void => {
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
		},
		[files],
	);

	/**
	 * DATE MANAGEMENT
	 *
	 * Callback function, which is  replaced when assignmentDateRange changes. This callback
	 * function allows for the updating of the assignmentDateRange state, given the date range the user changed it to.
	 * It does calculation depending on whether the user chose a shorter date, or a longer date.
	 * @param dates The dates the user selects via the modal
	 */
	const updateDates = React.useCallback(
		(dates: AssignmentDateRange) => {
			const { start, end } = dates;
			if (start.date.getTime() < assignmentDateRange.start.date.getTime()) {
				const newStartDates = generateAssignmentDatesFromStartEnd(start, assignmentDateRange.start, true);
				setAssignmentDateRange((oldAssignmentDateRange) => ({
					...oldAssignmentDateRange,
					dates: assignDatesRank([...newStartDates, ...oldAssignmentDateRange.dates]),
					start,
				}));
			} else if (end.date.getTime() > assignmentDateRange.end.date.getTime()) {
				const newEndDates = generateAssignmentDatesFromStartEnd(assignmentDateRange.end, end);
				setAssignmentDateRange((oldAssignmentDateRange) => ({
					...oldAssignmentDateRange,
					dates: assignDatesRank([...oldAssignmentDateRange.dates, ...newEndDates.slice(1)]),
					end,
				}));
			} else if (end.date.getTime() < assignmentDateRange.end.date.getTime()) {
				const index = getIndexOfSelectedDateInDates(end, assignmentDateRange.dates);
				if (index !== -1) {
					setAssignmentDateRange((oldAssignmentDateRange) => ({
						...oldAssignmentDateRange,
						dates: assignDatesRank(oldAssignmentDateRange.dates.slice(0, index + 1)),
						end,
					}));
				}
			} else if (start.date.getTime() > assignmentDateRange.start.date.getTime()) {
				const index = getIndexOfSelectedDateInDates(start, assignmentDateRange.dates, true);
				if (index !== -1) {
					setAssignmentDateRange((oldAssignmentDateRange) => ({
						...oldAssignmentDateRange,
						dates: assignDatesRank(oldAssignmentDateRange.dates.slice(index)),
						start,
					}));
				}
			}
		},
		[assignmentDateRange],
	);

	/**
	 * Triggers when files, fileSelected, dates, or taskCache are changed
	 * - updates docXML data via parsing the file (document editing is not yet supported)
	 * - checks if the cache contains an entry to the current file name (which serves as the key)
	 *   - if it **does** contain an entry, it pulls the data from the cache and sets the task array to that entry, without parsing the document or anything
	 *   - if it **does not** contain an entry with key filename, then it sets the task collection via parsing the document
	 */
	React.useEffect(() => {
		if (files?.length && fileSelected !== undefined) {
			const currentFile: File = files[fileSelected];

			const cacheDocument = documentCache?.find((eachEntry) => eachEntry.key === currentFile.name);
			const cacheEntry = localStorage.getItem(currentFile.name);
			if (cacheDocument && cacheEntry) {
				const parsedCachedTasks: Task[] = JSON.parse(cacheEntry);
				setDocument(cacheDocument.doc);
				setTasks(
					[...parsedCachedTasks].map((eachTask) => ({ ...eachTask, dueDate: new Date(eachTask.dueDate) })),
				);
			} else {
				const readText = readFile(currentFile);
				parseFileTextToXML(readText)
					.then((result) => {
						setDocumentCache((oldCache) => {
							if (oldCache) {
								return [...oldCache, { doc: result, key: currentFile.name }];
							}
							return [{ doc: result, key: currentFile.name }];
						});
						setDocument(result);
					})
					// eslint-disable-next-line no-console -- no logger present yet
					.catch((error) => console.error(error));
				const parts = findParts(readText);
				findPoints(parts)
					.then((newTasks) => {
						const parsedTasks = updateDueDates(newTasks, assignmentDateRange);
						setTasks(parsedTasks);
						localStorage.setItem(currentFile.name, JSON.stringify(parsedTasks));
					})
					// eslint-disable-next-line no-console -- no logger present yet
					.catch((err) => console.error(err));
			}
		}
	}, [files, fileSelected, documentCache, assignmentDateRange]);

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
			tasks,
			updateTasks: (newTasks: Task[]) => setTasks(newTasks),
		}),
		[tasks],
	);

	const pdfUpload = React.useCallback((htmlElem: HTMLElement | HTMLSpanElement | null) => {
		uploadDocument(htmlElem);
	}, []);

	return (
		<div className="d-flex flex-column">
			<AppHeader />
			<div className="d-flex flex-row justify-content-around border-bottom border-opacity-50 pb-5 shadow-lg">
				<span>
					<SetDateTime
						addError={(error: Error | undefined, operation: ERROR_OPS): void =>
							updateErrors("date", operation, error)
						}
						assignmentDateRange={assignmentDateRange}
						update={(value: AssignmentDateRange): void => updateDates(value)}
					/>
				</span>
				<span className="my-auto">
					<FileDisplay
						currentSelection={fileSelected}
						files={files}
						updateCurrentSelection={(ind: number): void => setFileSelected(ind)}
						updateFiles={updateFiles}
						uploadDocument={(): void => pdfUpload(timelineRef.current)}
					/>
				</span>
				<FileImport
					files={files}
					update={(theFiles: File[]): void => setFiles(theFiles)}
				/>
			</div>
			{!errors.date && !errors.file ? (
				<>
					{fileSelected !== undefined && files?.length ? (
						<div className="d-flex flex-row pt-3 bg-light shadow">
							<Col>
								{tasks?.length ? (
									<TaskContext.Provider value={taskMemo()}>
										<Timeline
											assignmentDate={assignmentDateRange}
											passRef={timelineRef}
										/>
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
								{document ? (
									<DocViewer
										docXML={document}
										fileImported={files.length > MIN_FILES_LENGTH}
										startDate={assignmentDateRange.start.date}
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
			)}
		</div>
	);
};
