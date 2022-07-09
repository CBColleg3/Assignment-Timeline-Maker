import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "./components/Timeline";
import type { Task } from "./templates/task";
import { SetDateTime } from "./components/Date/SetDateTime";
import { FileImport } from "./components/FileImport";
import { DocViewer } from "./components/document-viewer/DocViewer";
import { Row, Col } from "react-bootstrap";
import styles from "./App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimeline } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

/**
 * Root component
 *
 * @returns {JSX.Element} Main app component
 */
function App() {
	const [startDate, setStartDate] = React.useState<Date>(new Date());
	const [endDate, setEndDate] = React.useState<Date>(new Date());
	const [taskArray, setTaskArray] = React.useState<Task[]>([]);
	const [fileImported, setFileImported] = React.useState<boolean>(false);
	const [docXML, setDocXML] = React.useState<Document | undefined>(undefined);

	return (
		<div className="Timeline-site">
			<div
				className={"text-center d-flex flex-column justify-content-center pb-4 border-bottom bg-light"}
			>
				<div
					className={`mt-5 h-100 ml-auto d-flex flex-row ${styles.header_title} justify-content-between`}
				>
					<div>
						<span className="fs-4 me-3">Assignment Timeline Maker</span>
						<span>
							<FontAwesomeIcon icon={faTimeline} size="2x" />
						</span>
					</div>
					<span className="float-right pe-5 pt-1" role="button">
						<a
							className="text-dark"
							href="https://github.com/CBColleg3/Assignment-Timeline-Maker"
						>
							<FontAwesomeIcon icon={faGithub} size="2x" />
						</a>
					</span>
				</div>
				<div className="text-muted text-wrap w-50 mx-auto text-center mt-3">
					<span className="fw-bolder">Authors:</span>
					<a
						className={` ${styles.author_link} text-decoration-none mx-2 text-secondary`}
						href="https://github.com/CBColleg3"
					>
						Christopher Bennett
					</a>
					<a
						className={` ${styles.author_link} text-decoration-none mx-2 text-secondary`}
						href="https://github.com/bgallamoza"
					>
						Brennan Gallamoza
					</a>
					<a
						className={` ${styles.author_link} text-decoration-none mx-2 text-secondary`}
						href="https://github.com/cthacker-udel"
					>
						Cameron Thacker
					</a>
				</div>
			</div>
			<Row className="pt-4">
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
			</Row>
		</div>
	);
}
export default App;
