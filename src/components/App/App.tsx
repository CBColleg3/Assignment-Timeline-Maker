import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline";
import type { Task } from "../../@types/Task";
import { SetDateTime } from "../Date/SetDateTime";
import FileImport from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Col } from "react-bootstrap";
import AppHeader from "./AppHeader";
import type { AssignmentDate } from "../../@types/AssignmentDate/AssignmentDate";
import { UpdateDateType } from "../../@types/AssignmentDate/UpdateDateType";

/**
 * Root component
 *
 * @returns Main application component
 */
export const App = (): JSX.Element => {
	const [dates, setDates] = React.useState<AssignmentDate>();
	const [taskArray, setTaskArray] = React.useState<Task[]>([]);
	const [fileImported, setFileImported] = React.useState<boolean>(false);
	const [docXML, setDocXML] = React.useState<Document | undefined>(undefined);

	return (
		<div className="d-flex flex-column">
			<AppHeader />
			<div className="d-flex flex-row justify-content-between">
				<span>
					<SetDateTime
						endDate={endDate}
						setEndDate={(dates: Date): void => setEndDate(dates)}
						setStartDate={(dates: Date): void => setStartDate(dates)}
						startDate={startDate}
					/>
				</span>
				<span>
					<FileImport
						endDate={endDate}
						setDocXML={setDocXML}
						setFileImported={(dates: boolean): void => setFileImported(dates)}
						setTaskArray={(dates: Task[]): void => setTaskArray(dates)}
						startDate={startDate}
					/>
				</span>
			</div>
			<div className="d-flex flex-row mt-3">
				<Col>
					<Timeline
						endDate={endDate}
						fileImported={fileImported}
						setTaskArray={(dates: Task[]): void => setTaskArray(dates)}
						startDate={startDate}
						taskArray={taskArray}
					/>
				</Col>
				<Col lg={5}>
					<DocViewer docXML={docXML} fileImported={fileImported} />{" "}
				</Col>
			</div>
		</div>
	);
};
