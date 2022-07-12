import { faCircle, faCircleCheck, faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, ListGroup } from "react-bootstrap";
import type { UpdateType } from "src/@types/FileDisplay/UpdateType";
import { displayFileWithSize } from "src/helpers";

/**
 * Props for the FileDisplay component
 */
type FileDisplayProps = {
	files: File[] | undefined;
	updateFiles: (type: UpdateType, idx: number) => void;
	currentSelection: number | undefined;
};

/**
 * The minimum amount of files allowed to render a list
 */
const MIN_FILES_LENGTH = 0;

/**
 * This component houses the logic for adding, deleting files from the imported file list
 *
 * @param {FileDisplayProps} props The passed in properties, used to display the current files and also update them as well with deleting
 * @returns A component which displays the files supplied to it, and allows for adding and deleting of files
 */
const FileDisplay = ({ files, updateFiles, currentSelection }: FileDisplayProps): JSX.Element => (
	<>
		{files && files.length > MIN_FILES_LENGTH ? (
			<ListGroup>
				{files.map((eachFile, index) => (
					<>
						{currentSelection ? (
							<ListGroup.Item
								action
								className="d-flex flex-row justify-content-between"
								eventKey={`file-${eachFile.name}`}
								key={`file-${eachFile.name}`}
							>
								{displayFileWithSize(eachFile)}
								<FontAwesomeIcon icon={faEraser} />
								{currentSelection === index ? (
									<FontAwesomeIcon icon={faCircleCheck} />
								) : (
									<FontAwesomeIcon icon={faCircle} />
								)}
							</ListGroup.Item>
						) : (
							<ListGroup.Item
								action
								eventKey={`file-${eachFile.name}`}
								key={`file-${eachFile.name}`}
							>
								{displayFileWithSize(eachFile)}
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

export { MIN_FILES_LENGTH, FileDisplay };
