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
	deleteFile: (_idx: number) => void;
	files: File[];
	selectFile: (_idx: number) => void;
	selectedFileIndex: number | undefined;
	uploadElementRef: HTMLSpanElement | null;
};

/**
 * This component houses the logic for adding, deleting files from the imported file list
 *
 * @param {FileDisplayProps} props The passed in properties, used to display the current files and also update them as well with deleting
 * @returns A component which displays the files supplied to it, and allows for adding and deleting of files
 */
const FileDisplay = ({
	deleteFile,
	files,
	selectFile,
	selectedFileIndex,
	uploadElementRef,
}: FileDisplayProps): JSX.Element => (
	<>
		{files?.length ? (
			<ListGroup>
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
				className="px-4"
				variant="warning"
			>
				{"No files imported"}
			</Alert>
		)}
	</>
);

export { FileDisplay };
