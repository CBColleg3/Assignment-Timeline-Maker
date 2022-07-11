import React from "react";
import type { Task } from "src/@types/Task";
import { calcDays, calcTotalPoints, calcDiffInDays, readFile } from "src/helpers";
import type { AssignmentDate } from "src/@types/AssignmentDate/AssignmentDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./FileImport.module.css";

const initialValues = {
	dragging: 0,
};

const DRAGGING_NUM_CONST = 1;

/**
 * Props for the FileImport component
 */
type FileImportProps = {
	/**
	 * Setter for updating tasks in the document
	 */
	setTaskArray: (tasks: Task[]) => void;
	/**
	 * Sets whether the file was imported or not
	 */
	setFileImported: (imported: boolean) => void;

	assignmentDate: AssignmentDate;

	setDocXML: (xml: Document) => void;
};

/**
 * Used for importing .xml files into the website. also updates taskArray.
 *
 * @param {FileImportProps} props The properties of the FileImport component
 * @returns {JSX.Element} FileImport component, houses logic for adding file
 */
export const FileImport = ({
	setTaskArray,
	setFileImported,
	assignmentDate,
	setDocXML,
}: FileImportProps): JSX.Element => {
	const [dragging, setDragging] = React.useState(initialValues.dragging);
	const dayCounter = 0;
	const pointSum = 0;

	/**
	 * This function finds the amount of points, and parts of a document that it reads via the readFile function
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event React import file event
	 * @returns {void}
	 */
	const handleFileInput = async (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		event: any,
	): Promise<void> => {
		const result = event?.target?.files?.length;
		const MIN_FILE_LENGTH = 0;
		if (result && result > MIN_FILE_LENGTH) {
			const fileContent = readFile(event.target.files);
			await findPoints(findParts(fileContent as Promise<string>));
			setFileImported(true);
		}
	};

	/**
	 * Accepts string of document.xml and locates 'w:t' tags containing text and returns string of text contained in document.xml
	 *
	 * @param {Promise<any>} fileText DocumentText used for finding parts
	 * @returns {Promise<any>} A promise of any type
	 */
	const findParts = async (fileText: Promise<string>): Promise<string> => {
		const CHILD_NODES_INDEX = 0;
		const result = await fileText.then((txt) => {
			const parser = new DOMParser();
			const textDoc = parser.parseFromString(txt, "text/xml");
			setDocXML(textDoc);

			const textArray = textDoc.getElementsByTagName("w:t");
			let total = "";
			for (const eachText of textArray) {
				total += eachText.childNodes[CHILD_NODES_INDEX].nodeValue;
			}
			return total;
		});
		return result;
	};

	/**
	 * This function uses regex to first find a sentence or phrase that starts and ends with a period, a comma, or a semicolon,
	 * it then finds two or more numbers followed by the word point, pt, points, or pts shortly after the number and then ends with a
	 * period, comma, or a semicolon to capture that part of the document. The full phrase is given via the document field of the
	 * task object, and it's further parsed by finding the regex of the number followed by points to get the actual points of the task.
	 * Once we find all of this we put it into a taskArray by adding each element of the captured document.
	 *
	 * @param {Promise<string>} cleanedText documentText used for finding points
	 * @returns {void}
	 */
	const findPoints = async (cleanedText: Promise<string>): Promise<void> => {
		const tasks: Task[] = [];
		const resultsArray: string[] = [];
		const re = /[^.,;]*\\d\\d?\\s?(?<pts>points?|pts?)[^.,;]*(?<punc>\\.|,|;)/gu;
		const reNum = /\\d+\\s?(?<pts>points?|pts?)/u;

		const TEMP_ARRAY_INDEX = 0;
		const RE_NUM_INDEX = 0;
		const RE_NUM_RESULT_MIN_LENGTH = 0;
		const COLOR_RESULT_MULTIPLIER = 5;
		const TASK_INDEX_INC = 1;

		await cleanedText.then((txt) => {
			let tempArray = re.exec(txt);
			while (tempArray !== null) {
				const tempArrayResult = tempArray[TEMP_ARRAY_INDEX];
				if (tempArrayResult) {
					resultsArray.push(tempArrayResult);
					tempArray = re.exec(txt);
				}
			}
			let taskIndex = 0;
			for (const elem of resultsArray) {
				if (elem !== null && reNum !== null) {
					const num = /(?<pts>points?|pts?)/u;
					const reNumResult = reNum.exec(elem);
					if (reNumResult && reNumResult.length > RE_NUM_RESULT_MIN_LENGTH) {
						const pointsResult = reNumResult[RE_NUM_INDEX].replace(num, "");
						const colorResult = parseInt(reNumResult[RE_NUM_INDEX], 10) * COLOR_RESULT_MULTIPLIER;
						if (pointsResult && colorResult) {
							tasks.push({
								autoDueDate: true,
								color: colorResult,
								document: elem.toString(),
								dueDate: new Date(),
								id: taskIndex + TASK_INDEX_INC,
								name: `${"Finish Task"}  ${taskIndex + TASK_INDEX_INC}`,
								points: pointsResult,
							});
							taskIndex += TASK_INDEX_INC;
						}
					}
				}
			}
			updateDueDates(tasks);
		});
	};

	/**
	 * Updates the due dates for all task objects, first it deep clones the original task array then it passes it into a helper function which returns
	 * an object with a date, a boolean, and a number. The boolean is for the number of days to complete the task increases while the number is the
	 * total number of points before the number of days increases. It then updates all of the tasks dueDate fields and updates TaskArray state.
	 *
	 * @param {Task[]} tasks The task objects
	 * @returns {void}
	 */
	function updateDueDates(tasks: Task[]): void {
		const UPDATE_POINT_SUM_VAL = 0;
		const UPDATE_DAY_COUNTER_INC = 1;

		const totalPoints = calcTotalPoints(tasks);
		const dateDiff = calcDiffInDays(assignmentDate.start, assignmentDate.end);
		let updateDayCounter = dayCounter;
		let updatePointSum = pointSum;
		const modifiedTasks = [...tasks].map((task: Task, index: number) => {
			const newDate = calcDays(
				tasks,
				index,
				updateDayCounter,
				updatePointSum,
				dateDiff,
				totalPoints,
				assignmentDate.start,
			);
			if (newDate.updateCounter) {
				updateDayCounter += UPDATE_DAY_COUNTER_INC;
				updatePointSum = UPDATE_POINT_SUM_VAL;
			} else {
				updatePointSum = newDate.updateSum;
			}

			return {
				...task,
				dueDate: newDate.date,
			};
		});
		setTaskArray(modifiedTasks);
	}

	return (
		<span
			className={`mt-4 ${dragging !== initialValues.dragging ? styles.drag_area_on : styles.drag_area_off}`}
			onDragEnter={(): void => setDragging((oldValue) => oldValue + DRAGGING_NUM_CONST)}
			onDragLeave={(): void => setDragging((oldValue) => oldValue - DRAGGING_NUM_CONST)}
			onDragOver={(event): void => event.preventDefault()}
			onDrop={(event): void => {
				event.preventDefault();
				setDragging(initialValues.dragging);
			}}
		>
			<input
				className={styles.invisible_form}
				data-multiple-caption="{count} files selected"
				id="assignment_import"
				multiple
				onChange={(event): void => {
					if (event.target.files) {
						console.log(event.target.files);
					}
				}}
				type="file"
			/>
			<div className="p-5 d-flex flex-column border border-info border-opacity-50 rounded">
				<span className="mx-auto">
					<FontAwesomeIcon
						icon={faFileArrowUp}
						size="lg"
					/>
				</span>
				<span>
					<label
						className={`me-1 fw-bolder ${styles.choose_a_file}`}
						htmlFor="assignment_import"
					>
						{"Choose a file"}
					</label>
					<span>{"or drag it here"}</span>
				</span>
			</div>
		</span>
	);
};
