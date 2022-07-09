import React from "react";
import JSZip from "jszip";
import { Form } from "react-bootstrap";
import type { Task } from "../../templates/task";
import { calcDays } from "../utils/calcDays";
import { calcTotalPoints } from "../utils/calcTotalPoints";
import { calcDiffInDays } from "../utils/calcDiffInDays";
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

	startDate: Date;
	endDate: Date;
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
	startDate,
	endDate,
	setDocXML,
}: FileImportProps): JSX.Element => {
	const dayCounter = 0;
	const pointSum = 0;

	/**
	 * This function finds the amount of points, and parts of a document that it reads via the readFile function
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event React import file event
	 * @returns {void}
	 */
	const handleFileInput = async (
		event: React.ChangeEvent<HTMLInputElement>,
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
	 * This function loads in the document via jsZip, it takes in a fileList and then loads it into jsZip to turn it into a readable string
	 *
	 * @param {HTMLInputElement} fileList fileList to read from
	 * @returns {Promise<any>} Promise of zip decompress result
	 */
	const readFile = async (
		fileList: HTMLInputElement["files"],
	): Promise<string | undefined> => {
		const MY_FILE_INDEX = 0;
		if (fileList) {
			const myFile: File = fileList[MY_FILE_INDEX];
			const jsZip = new JSZip();
			const loadResult = await jsZip
				.loadAsync(myFile)
				.then(async (zip) => zip.files["word/document.xml"].async("string"));
			return loadResult;
		}
		return undefined;
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
						const colorResult =
							parseInt(reNumResult[RE_NUM_INDEX], 10) * COLOR_RESULT_MULTIPLIER;
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
		const dateDiff = calcDiffInDays(startDate, endDate);
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
				startDate,
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
		<div>
			<div>
				<p>
					<Form.Group controlId="exampleForm">
						<h2>
							{" "}
							<Form.Label>{"Upload a document"}</Form.Label>
						</h2>

						<p>
							<Form.Control
								// eslint-disable-next-line @typescript-eslint/no-misused-promises -- keep Promise<void> as return value
								onChange={async (
									event: React.ChangeEvent<HTMLInputElement>,
								): Promise<void> => handleFileInput(event)}
								type="file"
							/>{" "}
						</p>
					</Form.Group>
				</p>
			</div>
		</div>
	);
};
