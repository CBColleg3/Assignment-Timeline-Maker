/* eslint-disable react/no-array-index-key -- index aids in unique keys */
import React from "react";
import { faCircle, faCircleCheck, faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ListGroup } from "react-bootstrap";
import type { UpdateType } from "src/@types";
import { displayFileWithSize } from "src/helpers";
import styles from "./FileDisplay.module.css";

/**
 * Props for the FileDisplay component
 */
type FileDisplayProps = {
	currentSelection: number | undefined;
	files: File[] | undefined;
	updateFiles: (type: UpdateType, idx: number) => void;
	updateCurrentSelection: (ind: number) => void;
};

/**
 * The minimum amount of files allowed to render a list
 */
const MIN_FILES_LENGTH = 0;

/**
 * Value file select is decremented if out of bounds
 */
const FILE_SELECTED_OUT_OF_BOUNDS_DECREMENTAL = 1;

/**
 * This component houses the logic for adding, deleting files from the imported file list
 *
 * @param {FileDisplayProps} props The passed in properties, used to display the current files and also update them as well with deleting
 * @returns A component which displays the files supplied to it, and allows for adding and deleting of files
 */
const FileDisplay = ({
	files,
	updateFiles,
	currentSelection,
	updateCurrentSelection,
}: FileDisplayProps): JSX.Element => (
	<>
		{files && files.length > MIN_FILES_LENGTH ? (
			<ListGroup>
				{files.map((eachFile, index) => (
					<>
						{currentSelection !== undefined ? (
							<ListGroup.Item
								action
								className="d-flex flex-row justify-content-between"
								eventKey={`${index}-file-${eachFile.name}-currSelection`}
								key={`${index}-currSelection`}
								onClick={(): void => updateCurrentSelection(index)}
								variant={index === currentSelection ? "primary" : "light"}
							>
								<span className="me-3">{displayFileWithSize(eachFile)}</span>
								<span className="ms-2">
									<FontAwesomeIcon
										className={`${styles.list_icon} p-1 rounded`}
										icon={faEraser}
										onClick={(): void => updateFiles("delete", index)}
									/>
									{currentSelection === index ? (
										<FontAwesomeIcon
											className="p-1 rounded"
											icon={faCircleCheck}
										/>
									) : (
										<FontAwesomeIcon
											className="p-1 rounded"
											icon={faCircle}
										/>
									)}
								</span>
							</ListGroup.Item>
						) : (
							<ListGroup.Item
								action
								className="d-flex flex-row justify-content-between"
								eventKey={`${index}-file-${eachFile.name}-nonCurrSelection`}
								key={`${index}`}
								onClick={(): void => updateCurrentSelection(index)}
							>
								<span className="me-3">{displayFileWithSize(eachFile)}</span>
								<span className="ms-2">
									<FontAwesomeIcon
										className={`${styles.list_icon} p-1 rounded`}
										icon={faEraser}
										onClick={(): void => updateFiles("delete", index)}
									/>
									<FontAwesomeIcon
										className="p-1 rounded"
										icon={faCircle}
									/>
								</span>
							</ListGroup.Item>
						)}
					</>
				))}
			</ListGroup>
		) : (
			<Alert
				className="px-4"
				variant="warning"
			>
				{"No files imported"}
			</Alert>
		)}
	</>
);

export { MIN_FILES_LENGTH, FileDisplay, FILE_SELECTED_OUT_OF_BOUNDS_DECREMENTAL };
