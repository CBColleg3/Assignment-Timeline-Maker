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

/**
 * Root component
 *
 * @returns Main application component
 */
export const App = (): JSX.Element => {
	const [dates, setDates] = React.useState<AssignmentDate>({ end: new Date(), start: new Date() });
	const [taskArray, setTaskArray] = React.useState<Task[]>([]);
	const [fileImported, setFileImported] = React.useState<boolean>(false);
	const [docXML, setDocXML] = React.useState<Document | undefined>(undefined);

	return (
		<div className="d-flex flex-column">
			<AppHeader />
			<div className="d-flex flex-row justify-content-between">
				<span>
					<SetDateTime update={(theDates: AssignmentDate): void => setDates(theDates)} />
				</span>
				<span>
					<FileImport
						assignmentDate={dates}
						setDocXML={setDocXML}
						setFileImported={(isImported: boolean): void => setFileImported(isImported)}
						setTaskArray={(tasks: Task[]): void => setTaskArray(tasks)}
					/>
				</span>
			</div>
			<div className="d-flex flex-row mt-3">
				<Col>
					<Timeline
						assignmentDate={dates}
						fileImported={fileImported}
						setTaskArray={(tasks: Task[]): void => setTaskArray(tasks)}
						taskArray={taskArray}
					/>
				</Col>
				<Col lg={5}>
					<DocViewer
						docXML={docXML}
						fileImported={fileImported}
					/>{" "}
				</Col>
			</div>
		</div>
	);
};
