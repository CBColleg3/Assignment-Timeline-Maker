import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline/Timeline";
import type { Task } from "../../@types/Task";
import { SetDateTime } from "../Date/SetDateTime";
import FileImport from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Col } from "react-bootstrap";
import AppHeader from "./AppHeader";
import type { AssignmentDate } from "../../@types/AssignmentDate/AssignmentDate";
import FileDisplay from "../FileDisplay";
import type { UpdateType } from "src/@types/FileDisplay/UpdateType";
import { MIN_FILES_LENGTH } from "../FileDisplay/FileDisplay";

/**
 * Root component
 *
 * @returns Main application component
 */
export const App = (): JSX.Element => {
	const [dates, setDates] = React.useState<AssignmentDate>({ end: new Date(), start: new Date() });
	const [taskArray, setTaskArray] = React.useState<Task[]>([]);
	const [files, setFiles] = React.useState<File[] | undefined>(undefined);
	const [docXML, setDocXML] = React.useState<Document | undefined>(undefined);

	/**
	 * Utility function to update the files state from the file display, or any other component that utilizes the files state
	 *
	 * @param type The type of operation to be performed on the files state
	 * @param index The index of the file to operate upon
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

	React.useEffect(() => {
		if (files) {
			console.log("files = ", files);
		}
	}, [files]);

	return (
		<div className="d-flex flex-column">
			<AppHeader />
			<div className="d-flex flex-row justify-content-around">
				<span>
					<SetDateTime
						assignmentDate={dates}
						update={(theDates: AssignmentDate): void => setDates(theDates)}
					/>
				</span>
				<span className="my-auto">
					<FileDisplay
						fileSizeSpec="mb"
						files={files}
						updateFiles={updateFiles}
					/>
				</span>
				<FileImport
					update={(theFiles: File[]) => setFiles(theFiles)}
					files={files}
				/>
			</div>
			<div className="d-flex flex-row mt-3">
				<Col>
					{files && (
						<Timeline
							assignmentDate={dates}
							fileImported={files.length > MIN_FILES_LENGTH}
							setTaskArray={(tasks: Task[]): void => setTaskArray(tasks)}
							taskArray={taskArray}
						/>
					)}
				</Col>
				<Col lg={5}>
					{files && (
						<DocViewer
							docXML={docXML}
							fileImported={files.length > MIN_FILES_LENGTH}
						/>
					)}{" "}
				</Col>
			</div>
		</div>
	);
};
