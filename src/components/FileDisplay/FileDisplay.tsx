/* eslint-disable react/no-array-index-key -- index aids in unique keys */
import React from "react";
import { faCircle, faCircleCheck, faEraser, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ListGroup } from "react-bootstrap";
import { displayFileWithSize } from "src/helpers";
import styles from "./FileDisplay.module.css";
import { uploadDocument } from "src/helpers/shared/uploadDocument";

/**
 * Props for the FileDisplay component
 */
type FileDisplayProps = {
	/**
	 * Function that removes a file, given the index of the file within the files array
	 */
	deleteFile: (_idx: number) => void;
	/**
	 * The array of files currently being displayed
	 */
	files: File[];
	/**
	 * Initiates the selection process for when the user selects a new file
	 */
	selectFile: (_idx: number) => void;
	/**
	 * The index of the selected file
	 */
	selectedFileIndex: number | undefined;
	/**
	 * The ref of the upload element, to provide additional support for drag/drop.
	 */
	uploadElementRef: HTMLSpanElement | null;
};

/**
 * This component houses the logic for adding, deleting files from the imported file list
 *
 * @param props - The passed in properties, used to display the current files and also update them as well with deleting
 * @param props.deleteFile - The function to remove file at index `_ind` from the internal `files` array
 * @param props.files - The internal array of displayed files
 * @param props.selectFile - The function to initiate the select file path
 * @param props.selectedFileIndex - The index of the currently selected file
 * @param props.uploadElementRef - The ref of the upload component
 * @returns A component which displays the files supplied to it, and allows for adding and deleting of files
 */
const FileDisplay = ({
	deleteFile,
	files,
	selectFile,
	selectedFileIndex,
	uploadElementRef,
}: FileDisplayProps): JSX.Element => (
	<div className={`${styles.file_display_section}`}>
		{files?.length ? (
			<ListGroup className={`${styles.file_display_container}`}>
				{files.map((eachFile, index) => {
					const isSelectedFile = index === selectedFileIndex;
					const selectedClassName = isSelectedFile ? "-currSelection" : "";
					const selectedVariant = isSelectedFile ? "primary" : "light";
					return (
						<ListGroup.Item
							action
							className="d-flex flex-row justify-content-between"
							eventKey={`${index}-file-${eachFile.name}${selectedClassName}`}
							key={`${index}${selectedClassName}`}
							onClick={(): void => selectFile(index)}
							variant={selectedVariant}
						>
							<span className="me-3">{displayFileWithSize(eachFile)}</span>
							<span className="ms-2">
								{isSelectedFile && (
									<FontAwesomeIcon
										className={`${styles.list_icon} p-1 rounded`}
										icon={faUpload}
										onClick={(): void => uploadDocument(uploadElementRef)}
									/>
								)}
								<FontAwesomeIcon
									className={`${styles.list_icon} p-1 rounded`}
									icon={faEraser}
									onClick={(): void => deleteFile(index)}
								/>
								{isSelectedFile ? (
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
					);
				})}
			</ListGroup>
		) : (
			<Alert
				className={`${styles.file_display_alert}`}
				variant="warning"
			>
				{"No Files Imported"}
			</Alert>
		)}
		<div className={`${styles.file_display_section_header}`}>{"Files"}</div>
	</div>
);

export { FileDisplay };
