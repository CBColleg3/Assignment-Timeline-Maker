import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "./components/Timeline";
import type { Task } from "./templates/task";
import { SetDateTime } from "./components/Date/SetDateTime";
import FileImport from "./components/FileImport";
import { DocViewer } from "./components/document-viewer/DocViewer";
import { Col } from "react-bootstrap";
import AppHeader from "./components/App/AppHeader";

/**
 * Root component
 *
 * @returns Main application component
 */
const App = (): JSX.Element => {
	const [startDate, setStartDate] = React.useState<Date>(new Date());
	const [endDate, setEndDate] = React.useState<Date>(new Date());
	const [taskArray, setTaskArray] = React.useState<Task[]>([]);
	const [fileImported, setFileImported] = React.useState<boolean>(false);
	const [docXML, setDocXML] = React.useState<Document | undefined>(undefined);

	return (
		<div>
			<AppHeader />
			<SetDateTime
				endDate={endDate}
				setEndDate={(dates: Date): void => setEndDate(dates)}
				setStartDate={(dates: Date): void => setStartDate(dates)}
				startDate={startDate}
			/>
			<FileImport
				endDate={endDate}
				setDocXML={setDocXML}
				setFileImported={(dates: boolean): void => setFileImported(dates)}
				setTaskArray={(dates: Task[]): void => setTaskArray(dates)}
				startDate={startDate}
			/>
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
export default App;
