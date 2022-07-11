import React, { useState } from "react";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "./components/Timeline";
import type { Task } from "./templates/task";
import { SetDateTime } from "./components/Date/SetDateTime";
import { FileImport } from "./components/FileImport";
import { DocViewer } from "./components/document-viewer/DocViewer";
import { Row, Col } from "react-bootstrap";

/**
 * Root component
 *
 * @returns {JSX.Element} Main app component
 */
function App() {
	//State
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());
	const [taskArray, setTaskArray] = useState<Task[]>([]);
	const [fileImported, setFileImported] = useState<boolean>(false);
	const [docXML, setDocXML] = useState<Document | undefined>(undefined);

	const [showMessage, setShowMessage] = useState<boolean>(false);
	const [modalMessage, setModalMessage] = useState<string>("");
	const [modalHeader, setModalHeader] = useState<string>("");

	return (
		<div className="Timeline-site">
			<header className="App-header">
				<p>Assignment Timeline Maker</p>
			</header>
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
			<Row>
				<Col>
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
			</Row>
		</div>
	);
}
export default App;
