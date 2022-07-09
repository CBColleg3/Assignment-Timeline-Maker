import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "./components/Timeline";
import type { Task } from "./templates/task";
import { SetDateTime } from "./components/Date/SetDateTime";
import { FileImport } from "./components/FileImport";
import { DocViewer } from "./components/document-viewer/DocViewer";
import { Col } from "react-bootstrap";
import AppHeader from "./components/App/AppHeader";

/**
 * Root component
 *
 * @returns Main application component
 */
function App(): JSX.Element {
	const [startDate, setStartDate] = React.useState<Date>(new Date());
	const [endDate, setEndDate] = React.useState<Date>(new Date());
	const [taskArray, setTaskArray] = React.useState<Task[]>([]);
	const [fileImported, setFileImported] = React.useState<boolean>(false);
	const [docXML, setDocXML] = React.useState<Document | undefined>(undefined);

	return (
		<div className="Timeline-site">
			<AppHeader />
			<div className="d-flex flex-row mt-3">
				<Col>
					<SetDateTime
						startDate={startDate}
						setStartDate={(dates) => setStartDate(dates)}
						endDate={endDate}
						setEndDate={(dates) => setEndDate(dates)}
					/>
					<FileImport
						taskArray={taskArray}
						setTaskArray={(dates) => setTaskArray(dates)}
						fileImported={fileImported}
						setFileImported={(dates) => setFileImported(dates)}
						startDate={startDate}
						endDate={endDate}
						setDocXML={setDocXML}
					/>
					<Timeline
						taskArray={taskArray}
						setTaskArray={(dates) => setTaskArray(dates)}
						fileImported={fileImported}
						startDate={startDate}
						endDate={endDate}
					/>
				</Col>
				<Col lg={5}>
					<DocViewer docXML={docXML} fileImported={fileImported} />{" "}
				</Col>
			</div>
		</div>
	);
}
export default App;
