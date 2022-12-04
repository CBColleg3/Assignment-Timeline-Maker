/* eslint-disable indent -- disabled */
/* eslint-disable no-unused-vars -- disabled */
/* eslint-disable no-shadow -- disabled */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./FileImport.module.css";
import { useFilesContext } from "src/context";
import { addToast, generateSuccessToast } from "src/helpers";

enum DraggingStatus {
	NOT_BEGUN = -1,
	STARTED = 0,
}

type DraggingState = {
	status: DraggingStatus;
	value: number;
};

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
 * Used for importing .xml files into the website. Also updates taskArray once a file that has been imported from this interface is selected from the FileDisplay component.
 *
 * @returns {JSX.Element} FileImport component, houses logic for adding file
 */
export const FileImport = (): JSX.Element => {
	const { addFiles, files } = useFilesContext();
	const [draggingState, setDraggingState] = React.useState<DraggingState>({
		status: DraggingStatus.NOT_BEGUN,
		value: 0,
	});
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
			? theFiles.filter((eachFile) => !currentFileNames.includes(eachFile.name))
			: theFiles;
	};

	return (
		<div
			className={`${styles.file_import_section} ${
				draggingState.value !== initialValues.dragging
					? styles.drag_area_on
					: draggingState.status !== DraggingStatus.NOT_BEGUN
					? styles.drag_area_off
					: ""
			}`}
			onDragEnter={(): void =>
				setDraggingState((oldDraggingState: DraggingState) => ({
					...oldDraggingState,
					status: DraggingStatus.STARTED,
					value: oldDraggingState.value + CONSTANTS.DRAGGING_NUM_CONST,
				}))
			}
			onDragLeave={(): void =>
				setDraggingState((oldDraggingState: DraggingState) => ({
					...oldDraggingState,
					value: oldDraggingState.value - CONSTANTS.DRAGGING_NUM_CONST,
				}))
			}
			onDragOver={(event): void => event.preventDefault()}
			onDrop={(event: React.DragEvent<HTMLSpanElement>): void => {
				event.preventDefault();
				if (event.dataTransfer.files) {
					const filteredFiles = filterFiles(event.dataTransfer.files);
					if (filteredFiles.length >= CONSTANTS.MIN_FILE_COUNT) {
						addToast(
							generateSuccessToast(
								"Uploaded Files Successfully!",
								`You uploaded the files ${filteredFiles
									.map((eachFile: File) => eachFile.name)
									.join(", ")} successfully!`,
							),
						);
						addFiles(filteredFiles);
					}
				}
				if (fileRef.current) {
					fileRef.current.value = "";
				}
				setDraggingState((oldDraggingState: DraggingState) => ({
					...oldDraggingState,
					value: initialValues.dragging,
				}));
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
							addToast(
								generateSuccessToast(
									"Uploaded Files Successfully!",
									`You uploaded the files ${filteredFiles
										.map((eachFile: File) => eachFile.name)
										.join(", ")} successfully!`,
								),
							);
							addFiles(filteredFiles);
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
