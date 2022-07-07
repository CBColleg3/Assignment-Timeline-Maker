import React from "react";
import JSZip, { file } from "jszip";
import { Form } from "react-bootstrap";
import type { Task } from "../interfaces/task";

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
  /**
   * Sets document XML
   */
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
  setDocXML,
}: FileImportProps): JSX.Element {
	/**
	 * This function finds the amount of points, and parts of a document that it reads via the readFile function
	 * 
	 * @param {React.ChangeEvent<HTMLInputElement>} event react event
	 */
	function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files.length) {
			const fileContent = readFile(event.target.files);
      const points = findPoints(findParts(fileContent));
			setFileImported(true);
			console.log(points);
		}
	}

	/**
	 * This function loads in the focument via jsZip, it takes in a fileList and then loads it into jsZip to turn it into a readable string
	 * 
	 * @param {HTMLInputElement["files"]} fileList fileList to read from
	 * @returns {Promise<string>} Readable string of contents of fileList converted into jsZip
	 */
	function readFile(fileList: HTMLInputElement["files"]): Promise<any> {
		const myFile: File = fileList![0];
		const jsZip = new JSZip();
		return jsZip.loadAsync(myFile).then((zip) => {
			return zip.files["word/document.xml"].async("string");
		});
	}

	/**
	 * accepts string of document.xml and locates 'w:t' tags containing text and returns string of text contained in document.xml
	 * 
	 * @param {Promise<any>} fileText documentText used for finding parts
	 * @returns {string} text contained in document.xml
	 */
	function findParts(fileText: Promise<any>): Promise<any> {
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
	 * @returns {Promise<Task[]>} Array of tasks
	 */
	function findPoints(cleanedText: Promise<any>): Promise<any> {
		const tasks: Task[] = [];
		let tempArray;
		const resultsArray: string[] = [];
		const re = new RegExp(
			"[^.,;]*\\d\\d?\\s?(points?|pts?)[^.,;]*(\\.|,|;)",
			"g",
		);
		const reNum = new RegExp("\\d+\\s?(points?|pts?)");
		return cleanedText.then((txt) => {
			tempArray = re.exec(txt);
			while (tempArray !== null) {
				resultsArray.push(tempArray![0]);
				tempArray = re.exec(txt);
			}
			let taskIndex = 0;
			for (const elem of resultsArray) {
				if (elem != null) {
					const num = new RegExp("(points?|pts?)");
					tasks.push({
						name: "Finish Task " + (taskIndex + 1),
						id: taskIndex + 1,
						document: elem.toString(),
						points: reNum.exec(elem)![0].replace(num, ""),
						color: parseInt(reNum.exec(elem)![0]) * 5,
					});
					taskIndex++;
				}
			}
			setTaskArray(tasks);
			return taskArray;
		});
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
