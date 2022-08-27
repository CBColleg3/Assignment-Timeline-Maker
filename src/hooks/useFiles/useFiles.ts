import React from "react";

/**
 * Constants for the hook
 */
const CONSTANTS = {
	SPLICE_IND: 0,
};

/**
 * Interface for the methods and members the hook will provide to the consumer
 */
type iUseFiles = {
	/**
	 * Appends a file `_file` to the end of the internal `files` array
	 *
	 * @param _file - The file to  append
	 */
	appendFile: (_file: File) => void;
	/**
	 * Clears all files from the internal `files` array
	 */
	clearFiles: () => void;
	/**
	 * Deletes a file at ind `_ind` from the internal `files` array
	 *
	 * @param _ind - The index of the file to delete
	 */
	deleteFile: (_ind: number) => void;
	/**
	 * The internal files array
	 */
	files: File[];
	/**
	 * Inserts a file `_file` at the specified index `_ind` in the internal `files` array
	 *
	 * @param _file - The file to insert
	 * @param _ind - The array index, which specifies where the file `_file` will be inserted at
	 */
	insertFile: (_file: File, _ind: number) => void;
	/**
	 * Whether a file is currently selected or not
	 */
	isFileSelected: boolean;
	/**
	 * Helper function which combines `setSelectedFile`, and `setSelectedFileIndex` into one method, rather then have to call the 2 consecutively to achieve desired effect
	 *
	 * @param _ind - The index of the file being selected
	 */
	selectFile: (_ind: number) => void;
	/**
	 * The selected file by the user
	 */
	selectedFile: File | undefined;
	/**
	 * The selected file's index in regards to it's placement in the internal `files` array
	 */
	selectedFileIndex: number | undefined;
	/**
	 * Updates the internal `files` array with the passed in File[]
	 *
	 * @param _files - The new files to replace the internal `files` state
	 */
	setFiles: (_files: File[]) => void;
	/**
	 * Updates the selected file with the passed in `_file` argument
	 *
	 * @param _file - The new selected file to override the internal `selectedFile` state
	 */
	setSelectedFile: (_file: File) => void;
	/**
	 * Updates the selected file's index in regards to it's placement in the internal `files` array
	 *
	 * @param _selectedFileIndex - The selected file index that will override the current internal `selectedFileIndex` state
	 */
	setSelectedFileIndex: (_selectedFileIndex: number | undefined) => void;
};

/**
 * Custom hook that eases the management of the file state for the consumer
 *
 * @returns The object with all functions available to mutate and capture the state
 */
export const useFiles = (): iUseFiles => {
	const [files, setFiles] = React.useState<File[]>([]);
	const [selectedFile, setSelectedFile] = React.useState<File | undefined>();
	const [selectedFileIndex, setSelectedFileIndex] = React.useState<number | undefined>();

	const memoProps: iUseFiles = React.useMemo(
		() => ({
			appendFile: (file: File): void => setFiles((oldFiles) => [...oldFiles, file]),
			clearFiles: (): void => setFiles([]),
			deleteFile: (ind: number): void => setFiles((oldFiles) => oldFiles.filter((_, i) => i !== ind)),
			files,
			insertFile: (file: File, ind: number): void => {
				const filesClone = [...files];
				filesClone.splice(ind, CONSTANTS.SPLICE_IND, file);
				setFiles(filesClone);
			},
			isFileSelected: selectedFile !== undefined && selectedFileIndex !== undefined,
			selectFile: (index: number): void => {
				setSelectedFileIndex(index);
				setSelectedFile(files[index]);
			},
			selectedFile,
			selectedFileIndex,
			setFiles: (newFiles: File[]): void => setFiles(newFiles),
			setSelectedFile: (newFile: File): void => setSelectedFile(newFile),
			setSelectedFileIndex: (index: number | undefined): void => setSelectedFileIndex(index),
		}),
		[files, selectedFile, selectedFileIndex],
	);

	return memoProps;
};
