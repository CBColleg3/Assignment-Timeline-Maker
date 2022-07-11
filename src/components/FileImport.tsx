import React from "react";
import JSZip from "jszip";
import { Form } from "react-bootstrap";
import type { Task } from "../templates/task";
import { calcDays } from "./utils/calcDays";
import { calcTotalPoints } from "./utils/calcTotalPoints";
import { calcDiffInDays } from "./utils/calcDiffInDays";
/**
 * Props for the FileImport component
 */
type FileImportProps = {
	/**
	 * Tasks in the document
	 */
	taskArray: Task[];
	/**
	 * Setter for updating tasks in the document
	 */
	setTaskArray: (tasks: Task[]) => void;
	/**
	 * Indicates whether the file was imported or not
	 */
	fileImported: boolean;
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
export function FileImport({
	taskArray,
	setTaskArray,
	fileImported,
	setFileImported,
	startDate,
	endDate,
	setDocXML,
}: FileImportProps): JSX.Element {
	const dayCounter = 0;
	const pointSum = 0;
	const color = "0000";

	/**
	 * This function finds the amount of points, and parts of a document that it reads via the readFile function
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event React import file event
	 * @returns {void}
	 */
	function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files.length) {
			const fileContent = readFile(event.target.files);
			findPoints(findParts(fileContent));
			setFileImported(true);
		}
	}

	/**
	 * This function loads in the document via jsZip, it takes in a fileList and then loads it into jsZip to turn it into a readable string
	 *
	 * @param {HTMLInputElement} fileList fileList to read from
	 * @returns {Promise<any>} Promise of zip decompress result
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function readFile(fileList: HTMLInputElement["files"]): Promise<any> {
		//const stringText = "";
		// accepts list of files from event
		// returns string of word/document.xml file
		if (fileList) {
			const myFile: File = fileList[0];
			const jsZip = new JSZip();
			return jsZip.loadAsync(myFile).then((zip) => {
				return zip.files["word/document.xml"].async("string");
			});
		}
		return new Promise((res, rej) => undefined);
	}

	/**
	 * accepts string of document.xml and locates 'w:t' tags containing text and returns string of text contained in document.xml
	 *
	 * @param {Promise<any>} fileText documentText used for finding parts
	 * @returns {Promise<any>} A promise of any type
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function findParts(fileText: Promise<any>): Promise<any> {
		//
		return fileText.then((txt) => {
			const parser = new DOMParser();
			const textDoc = parser.parseFromString(txt, "text/xml");
			setDocXML(textDoc);

			const textArray = textDoc.getElementsByTagName("w:t");
			let total = "";
			for (let i = 0; i < textArray.length; i++) {
				total += textArray[i].childNodes[0].nodeValue;
			}
			return total;
		});
	}

	/**
	 * this function uses regex to first find a sentence or phrase that starts and ends with a period, a comma, or a semicolon,
	 * it then finds two or more numbers followed by the word point, pt, points, or pts shortly after the number and then ends with a
	 * period, comma, or a semicolon to capture that part of the document. The full phrase is given via the document field of the
	 * task object, and it's further parsed by finding the regex of the number followed by points to get the actual points of the task.
	 * Once we find all of this we put it into a taskArray by adding each element of the captured document.
	 *
	 * @param {Promise<any>} cleanedText documentText used for finding points
	 * @returns {void}
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function findPoints(cleanedText: Promise<any>): void {
		// accepts string of text from document.xml
		// returns array of point values found in document
		const tasks: Task[] = [];
		let tempArray;
		const resultsArray: string[] = [];
		const re = new RegExp(
			"[^.,;]*\\d\\d?\\s?(points?|pts?)[^.,;]*(\\.|,|;)",
			"g",
		);
		const reNum = new RegExp("\\d+\\s?(points?|pts?)");
		cleanedText.then((txt) => {
			tempArray = re.exec(txt);
			while (tempArray !== null) {
				const tempArrayResult = tempArray[0];
				if (tempArrayResult) {
					resultsArray.push(tempArrayResult);
					tempArray = re.exec(txt);
				}
			}
			let taskIndex = 0;
			for (const elem of resultsArray) {
				if (elem !== null && reNum !== null) {
					const num = new RegExp("(points?|pts?)");
					const reNumResult = reNum.exec(elem);
					if (reNumResult && reNumResult.length > 0) {
						const pointsResult = reNumResult[0].replace(num, "");
						if (pointsResult) {
							tasks.push({
								name: "Finish Task " + (taskIndex + 1),
								id: taskIndex + 1,
								document: elem.toString(),
								points: pointsResult,
								color: "0000",
								dueDate: new Date(),
								autoDueDate: true,
							});
							taskIndex++;
						}
					}
				}
			}
			UpdateDueDates(tasks);
		});
	}

	/**
	 * Updates the due dates for all task objects, first it deep clones the original task array then it passes it into a helper function which returns
	 * an object with a date, a boolean, and a number. The boolean is for the number of days to complete the task increases while the number is the
	 * total number of points before the number of days increases. It then updates all of the tasks dueDate fields and updates TaskArray state.
	 *
	 * @param {Task[]} tasks The task objects
	 * @returns {void}
	 */
	function UpdateDueDates(tasks: Task[]): void {
		const totalPoints = calcTotalPoints(tasks);
		const dateDiff = calcDiffInDays(startDate, endDate);
		let updateDayCounter = dayCounter;
		let updatePointSum = pointSum;
		let updateColor = color;
		const modifiedTasks = [...tasks].map((task: Task, index: number) => {
			const newDate = calcDays(
				tasks,
				index,
				updateColor,
				updateDayCounter,
				updatePointSum,
				dateDiff,
				totalPoints,
				startDate,
			);
			if (newDate.updateCounter) {
				console.log("Day Counter increased");
				updateDayCounter++;
				updatePointSum = 0;	
			} else {
				updatePointSum = newDate.updateSum;
			}
			updateColor = newDate.color;

			return {
				...task,
				dueDate: newDate.date,
				color: newDate.color
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
							<Form.Label>Upload a document</Form.Label>
						</h2>

						<p>
							<Form.Control type="file" onChange={handleFileInput} />{" "}
						</p>
					</Form.Group>
				</p>
			</div>
		</div>
	);
}
