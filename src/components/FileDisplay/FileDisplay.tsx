import React from "react";
import { Alert, ListGroup } from "react-bootstrap";
import type { UpdateType } from "src/@types/FileDisplay/UpdateType";
import type { FileSizeSpec } from "src/helpers/displayFileWithSize";
import { displayFileWithSize } from "src/helpers";

/**
 * Props for the FileDisplay component
 */
type FileDisplayProps = {
	files: File[] | undefined;
	updateFiles: (type: UpdateType, idx: number) => void;
	fileSizeSpec: FileSizeSpec;
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
const FileDisplay = ({ files, updateFiles, fileSizeSpec }: FileDisplayProps): JSX.Element => (
	<>
		{files && files.length > MIN_FILES_LENGTH ? (
			<ListGroup>
				{files.map((eachFile) => (
					<ListGroup.Item
						action
						eventKey={`file-${eachFile.name}`}
						key={`file-${eachFile.name}`}
					>
						{displayFileWithSize(eachFile, fileSizeSpec)}
					</ListGroup.Item>
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
