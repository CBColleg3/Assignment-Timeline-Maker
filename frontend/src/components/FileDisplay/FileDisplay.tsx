/* eslint-disable react/no-array-index-key -- index aids in unique keys */
import React from "react";
import { faCircle, faCircleCheck, faEraser, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ListGroup } from "react-bootstrap";
import { displayFileWithSize } from "src/helpers";
import styles from "./FileDisplay.module.css";
import { uploadDocument } from "src/helpers/shared/uploadDocument";
import { useFilesContext } from "src/context";

/**
 * This component houses the logic for adding, deleting files from the imported file list
 *
 * @returns A component which displays the files supplied to it, and allows for adding and deleting of files
 */
const FileDisplay = (): JSX.Element => {
	const { files, removeFileByIndex, selectedFile, setSelectedFile } = useFilesContext();

	return (
		<div className={`${styles.file_display_section}`}>
			{files?.length > 0 ? (
				<ListGroup className={`${styles.file_display_container}`}>
					{files.map((eachFile, index) => {
						const isSelectedFile = eachFile.name === selectedFile?.name;
						const selectedClassName = isSelectedFile ? "-currSelection" : "";
						const selectedVariant = isSelectedFile ? "primary" : "light";
						return (
							<ListGroup.Item
								action
								className="d-flex flex-row justify-content-between"
								eventKey={`${index}-file-${eachFile.name}${selectedClassName}`}
								key={`${index}${selectedClassName}`}
								onClick={(): void => setSelectedFile(index)}
								variant={selectedVariant}
							>
								<span className="me-3">{displayFileWithSize(eachFile)}</span>
								<span className="ms-2">
									{/* {isSelectedFile && (
										<FontAwesomeIcon
											className={`${styles.list_icon} p-1 rounded`}
											icon={faUpload}
											onClick={(): void => uploadDocument(uploadElementRef)}
										/>
									)} */}
									<FontAwesomeIcon
										className={`${styles.list_icon} p-1 rounded`}
										icon={faEraser}
										onClick={(): void => removeFileByIndex(index)}
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
};

export { FileDisplay };
