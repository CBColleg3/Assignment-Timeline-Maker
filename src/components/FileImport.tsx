import React from "react";
import JSZip from "jszip";
import { Form } from "react-bootstrap";
import type { Task } from "../templates/task";
import {
	calcDays,
	calcTotalPoints,
	dateDiffInDays,
} from "./utils/timelineUtils";

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
	const [dayCounter] = React.useState<number>(0);
	const [pointSum] = React.useState<number>(0);

	/**
	 * This function finds the amount of points, and parts of a document that it reads via the readFile function
	 * @param event react event
	 */
	function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files.length) {
			//if (!event.target.files) return;
			const fileContent = readFile(event.target.files);
			// console.log(fileContent);
			findPoints(findParts(fileContent));
			setFileImported(true);
			//console.log(points);
		}
	}

	/**
	 * This function loads in the focument via jsZip, it takes in a fileList and then loads it into jsZip to turn it into a readable string
	 * @param fileList fileList to read from
	 * @returns
	 */
	function readFile(fileList: HTMLInputElement["files"]): Promise<any> {
		// accepts list of files from event
		// returns string of word/document.xml file
		const myFile: File = fileList![0];
		const jsZip = new JSZip();

		//const stringText = "";

		console.log(fileList);
		return jsZip.loadAsync(myFile).then((zip) => {
			console.log(zip);

			return zip.files["word/document.xml"].async("string");
		});
	}

	/**
	 *accepts string of document.xml and locates 'w:t' tags containing text and returns string of text contained in document.xml
	 * @param fileText documentText used for finding parts
	 * @returns
	 */
	function findParts(fileText: Promise<any>): Promise<any> {
		//
		return fileText.then((txt) => {
			console.log(txt);

			const parser = new DOMParser();
			const textDoc = parser.parseFromString(txt, "text/xml");
			console.log(textDoc);
			setDocXML(textDoc);

			const textArray = textDoc.getElementsByTagName("w:t");
			let total = "";
			for (let i = 0; i < textArray.length; i++) {
				total += textArray[i].childNodes[0].nodeValue;
			}
			console.log(total);
			//setContent(total as string);
			return total;
		});
	}

	/**
	 * this function uses regex to first find a sentence or phrase that starts and ends with a period, a comma, or a semicolon,
	 * it then finds two or more numbers followed by the word point, pt, points, or pts shortly after the number and then ends with a
	 * period, comma, or a semicolon to capture that part of the document. The full phrase is given via the document field of the
	 * task object, and it's further parsed by finding the regex of the number followed by points to get the actual points of the task.
	 * Once we find all of this we put it into a taskArray by adding each element of the captured document.
	 * @param fileText documentText used for finding points
	 * @returns
	 */
	function findPoints(cleanedText: Promise<any>): void {
		// accepts string of text from document.xml
		// returns array of point values found in document
		const tasks: Task[] = [];
		let tempArray;
		//let ptsArrayClone: string[] = [];
		const resultsArray: string[] = [];
		const re = new RegExp(
			"[^.,;]*\\d\\d?\\s?(points?|pts?)[^.,;]*(\\.|,|;)",
			"g",
		); //(?!\\.|,|;).*\\d\\d?\\s?(points?|pts?)*?(?<!\\.|,|;)  (?!\.|,|;).*?(?<!\.|,|;)\d\d?\s?(points?|pts?)
		const reNum = new RegExp("\\d+\\s?(points?|pts?)");
		// const reDoc = new RegExp("[^.,;]*\\d\\d?\\s?(points?|pts?)[^.,;]*(\\.|,|;)", "g");
		cleanedText.then((txt) => {
			tempArray = re.exec(txt);
			//  console.log(tempArray);
			while (tempArray !== null) {
				console.log(tempArray[0]);
				resultsArray.push(tempArray![0]);
				tempArray = re.exec(txt);
			}
			let taskIndex = 0;
			for (const elem of resultsArray) {
				if (elem != null) {
					const num = new RegExp("(points?|pts?)");
					console.log("elem:", elem);

					tasks.push({
						name: "Finish Task " + (taskIndex + 1),
						id: taskIndex + 1,
						document: elem.toString(),
						points: reNum.exec(elem)![0].replace(num, ""),
						color: parseInt(reNum.exec(elem)![0]) * 5,
						dueDate: new Date(),
						autoDueDate: true,
					});
					// console.log(tasks);
					taskIndex++;
				}
			}
			console.log("resultsArray", resultsArray);
			//setTaskArray(tasks);
			UpdateDueDates(tasks);
		});
	}

	/**
	 * Updates the due dates for all task objects, first it deep clones the original task array then it passes it into a helper function which returns
	 * an object with a date, a boolean, and a number. The boolean is for the number of days to complete the task increases while the number is the
	 * total number of points before the number of days increases. It then updates all of the tasks dueDate fields and updates TaskArray state.
	 *
	 * @param tasks
	 */
	function UpdateDueDates(tasks: Task[]): void {
		const totalPoints = calcTotalPoints(tasks);
		const dateDiff = dateDiffInDays(startDate, endDate);
		let updateDayCounter = dayCounter;
		let updatePointSum = pointSum;
		const modifiedTasks = [...tasks].map((task: Task, index: number) => {
			console.log(
				`state: ${JSON.stringify({
					index,
					updateDayCounter,
					updatePointSum,
					dateDiff,
					totalPoints,
					startDate,
				})}`,
			);
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
				updateDayCounter++;
				updatePointSum = 0;
			} else {
				updatePointSum = newDate.updateSum;
			}

			console.log("newDate = ", newDate);
			return {
				...task,
				dueDate: newDate.date,
			};
		});
		setTaskArray(modifiedTasks);
		// console.log("taskArray", taskArray);
		// console.log("taskArrayLength", taskArray.length);
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
