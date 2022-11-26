import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./FileImport.module.css";

/**
 * Initial values for the component
 */
const initialValues = {
	dragging: 0,
};

/**
 * Constants for the component
 */
const CONSTANTS = {
	DRAGGING_NUM_CONST: 1,
	MIN_FILE_COUNT: 1,
};

/**
 * Props for the FileImport component
 */
type FileImportProps = {
	files: File[] | undefined;
	update: (_theFiles: File[]) => void;
};

/**
 * Used for importing .xml files into the website. also updates taskArray.
 *
 * @param {FileImportProps} props The properties of the FileImport component
 * @returns {JSX.Element} FileImport component, houses logic for adding file
 */
export const FileImport = ({ files, update }: FileImportProps): JSX.Element => {
	const [dragging, setDragging] = React.useState(initialValues.dragging);
	const fileRef = React.createRef<HTMLInputElement>();

	/**
	 * Filters the current files against the files added, and only returns the files that are not already currently imported
	 *
	 * @param fileList The files to filter out
	 * @returns The filtered files
	 */
	const filterFiles = (fileList: FileList): File[] => {
		const theFiles = Object.values(fileList);
		const currentFileNames = files?.map((eachFile) => eachFile.name);
		return currentFileNames
			? files
				? [...files, ...theFiles.filter((eachFile) => !currentFileNames.includes(eachFile.name))]
				: theFiles.filter((eachFile) => !currentFileNames.includes(eachFile.name))
			: theFiles;
	};

	return (
		<div
			className={`${styles.file_import_section} ${
				dragging !== initialValues.dragging ? styles.drag_area_on : styles.drag_area_off
			}`}
			onDragEnter={(): void => setDragging((oldValue) => oldValue + CONSTANTS.DRAGGING_NUM_CONST)}
			onDragLeave={(): void => setDragging((oldValue) => oldValue - CONSTANTS.DRAGGING_NUM_CONST)}
			onDragOver={(event): void => event.preventDefault()}
			onDrop={(event: React.DragEvent<HTMLSpanElement>): void => {
				event.preventDefault();
				if (event.dataTransfer.files) {
					const filteredFiles = filterFiles(event.dataTransfer.files);
					if (filteredFiles.length >= CONSTANTS.MIN_FILE_COUNT) {
						update(filteredFiles);
					}
				}
				if (fileRef.current) {
					fileRef.current.value = "";
				}
				setDragging(initialValues.dragging);
			}}
		>
			<input
				className={styles.invisible_form}
				data-multiple-caption="{count} files selected"
				id="assignment_import"
				multiple
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
					if (event.target.files) {
						const filteredFiles = filterFiles(event.target.files);
						if (filteredFiles.length >= CONSTANTS.MIN_FILE_COUNT) {
							update(filteredFiles);
						}
					}
					if (fileRef.current) {
						fileRef.current.value = "";
					}
				}}
				ref={fileRef}
				type="file"
			/>
			<div className="p-5 d-flex flex-column rounded">
				<span className="mx-auto">
					<FontAwesomeIcon
						icon={faFileArrowUp}
						size="lg"
					/>
				</span>
				<span>
					<label
						className={`me-1 fw-bolder ${styles.choose_a_file}`}
						htmlFor="assignment_import"
					>
						{"Choose a file"}
					</label>
					<span>{"or drag it here"}</span>
				</span>
			</div>
			<div className={`${styles.file_import_section_header}`}>{"Upload"}</div>
		</div>
	);
};
