/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline/Timeline";
import { SetDateTime } from "../Date/SetDateTime";
import { FileImport } from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Button, Col } from "react-bootstrap";
import { AppHeader } from "./AppHeader";
import { FileDisplay } from "../FileDisplay";

import { ClimbingBoxLoader, ClockLoader } from "react-spinners";
import { useAssignmentDateInfoContext, useFilesContext, useTaskContext } from "src/context";
import { useFiles, useDocument } from "src/hooks";
import { TimelineAlert } from "../TimelineAlert";
import { addToast, findParts, findPoints, generateInfoToast, updateDueDates } from "src/helpers";

import styles from "./App.module.css";
import type { TimelineToast } from "src/@types/Notifications/TimelineToast";
import { TimelineToastContainer } from "src/common/components/TimelineToastContainer";

const ALERT_CONSTANTS = {
	CANNOT_RENDER_TIMELINE: "Cannot render Timeline",
	CHOOSE_A_FILE: "Choose a file",
	NO_FILE_SELECTED: "Must select a file from the above list to begin timeline generation",
	OR_DRAG_DROP: "or drag-and-drop files into the outlined box to begin timeline generation",
	SELECT_FILE_FROM_LINK: "Select file(s) from the link",
};

/**
 * Root component
 *
 * @returns Main application component
 */
export const App = (): JSX.Element => {
	const ref = React.createRef<HTMLSpanElement>();
	const { dates, format, start, changingDate } = useAssignmentDateInfoContext();
	const { updateTasks, tasks } = useTaskContext();
	const { files, selectedFile } = useFilesContext();

	return (
		<div className={`d-flex flex-column position-relative ${styles.app_component}`}>
			<AppHeader />
			<div
				className={`d-flex flex-row border-bottom border-opacity-50 shadow-lg ${styles.app_settings_menu}`}
			>
				<SetDateTime />
				<FileDisplay />
				<FileImport />
			</div>
			{files.length > 0 ? (
				<>
					{selectedFile !== undefined ? (
						<div className="d-flex flex-row pt-3 bg-light shadow">
							<Col>
								{tasks?.length ? (
									<Timeline passRef={ref} />
								) : (
									<div className="w-100 d-flex flex-row justify-content-center">
										<span className="d-flex flex-column">
											<span className="text-dark fw-bold text-opacity-75 fs-6 text-wrap my-3">
												{"Generating Timeline"}
											</span>
											<span className="mx-auto">
												<ClockLoader
													color="#000000"
													loading
												/>
											</span>
										</span>
									</div>
								)}
							</Col>
							{/* <Col lg={5}>
								{parsedDocument ? (
									<DocViewer
										docXML={parsedDocument}
										fileImported={isFileSelected}
										startDate={start.date}
										tasks={tasks}
									/>
								) : (
									<div className="w-100 d-flex flex-row justify-content-center">
										<span className="d-flex flex-column">
											<span className="text-primary fw-bold text-opacity-75 fs-6 text-wrap my-3">
												{"Generating Document View"}
											</span>
											<span className="mx-auto">
												<ClimbingBoxLoader
													color="#5050F1"
													loading
												/>
											</span>
										</span>
									</div>
								)}{" "}
							</Col> */}
						</div>
					) : (
						<>
							{files.length > 0 ? (
								<TimelineAlert
									body={ALERT_CONSTANTS.NO_FILE_SELECTED}
									componentClassName="w-75 mt-4 mx-auto text-center"
									variant="info"
								/>
							) : (
								<TimelineAlert
									body={
										<span>
											{ALERT_CONSTANTS.SELECT_FILE_FROM_LINK}
											<span className="fw-bold mx-1">{ALERT_CONSTANTS.CHOOSE_A_FILE}</span>
											{ALERT_CONSTANTS.OR_DRAG_DROP}
										</span>
									}
									componentClassName="w-75 mt-4 mx-auto text-center"
									variant="info"
								/>
							)}
						</>
					)}
				</>
			) : (
				<TimelineAlert
					body={
						<span>
							{ALERT_CONSTANTS.SELECT_FILE_FROM_LINK}
							<span className="fw-bold mx-1">{ALERT_CONSTANTS.CHOOSE_A_FILE}</span>
							{ALERT_CONSTANTS.OR_DRAG_DROP}
						</span>
					}
					componentClassName="w-75 mt-4 mx-auto text-center"
					variant="info"
				/>
			)}
			<TimelineToastContainer orientation="right" />
		</div>
	);
};
