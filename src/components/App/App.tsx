/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "../Timeline/Timeline";
import { SetDateTime } from "../Date/SetDateTime";
import { FileImport } from "../FileImport";
import { DocViewer } from "../DocViewer/DocViewer";
import { Col } from "react-bootstrap";
import { AppHeader } from "./AppHeader";
import { FileDisplay } from "../FileDisplay";

import { ClimbingBoxLoader, ClockLoader } from "react-spinners";
import { useFilesContext, useTaskContext } from "src/context";
import { TimelineAlert } from "../TimelineAlert";

import styles from "./App.module.css";
import { TimelineToastContainer } from "src/common/components/TimelineToastContainer";

/**
 * Text constants supplied to the TimelineAlert component
 */
const ALERT_CONSTANTS = {
	/**
	 * Text constant is used when the Timeline is unable to be rendered
	 */
	CANNOT_RENDER_TIMELINE: "Cannot render Timeline",
	/**
	 * Text constant is used when a file is not present in the FileDisplay component, aka the user has not uploaded a file
	 */
	CHOOSE_A_FILE: "Choose a file",
	/**
	 * Text constant is used when a file is uploaded and present in the FileDisplay component, prompting the user to select a file to begin timeline generation
	 */
	NO_FILE_SELECTED: "Must select a file from the above list to begin timeline generation",
	/**
	 * Text constant when a file is not present in the FileDisplay component, and instructing the user to also use the drag-drop functionality for uploading files
	 */
	OR_DRAG_DROP: "or drag-and-drop files into the outlined box to begin timeline generation",
	/**
	 * Text constant when a file is not present in the FileDisplay component, and instructing the user to use the "choose a file" link for uploading files
	 */
	SELECT_FILE_FROM_LINK: "Select file(s) from the link",
};

/**
 * The main application, houses all the components for generating a timeline of the assignments given a document
 *
 * @returns The Assignment-Timeline Generator
 */
export const App = (): JSX.Element => {
	const ref = React.createRef<HTMLSpanElement>();
	const { tasks } = useTaskContext();
	const { files, selectedFile, selectedFileXML } = useFilesContext();

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
							<Col lg={5}>
								{selectedFile && selectedFileXML ? (
									<DocViewer />
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
							</Col>
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
