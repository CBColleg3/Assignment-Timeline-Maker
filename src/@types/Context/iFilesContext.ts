/**
 * Context for the FileContext state
 */
export type iFilesContext = {
	/**
	 * Adds a file to the internal files collection `files`
	 *
	 * @param _file - The file we are adding
	 * @returns void due to internal mutation
	 */
	addFile: (_file: File) => void;
	/**
	 * Adds multiple files to the internal files collection `files`
	 *
	 * @param _files - The files we are adding to the internal files state
	 * @returns void due to internal mutation
	 */
	addFiles: (_files: File[]) => void;
	/**
	 * Clears all files in the internal `files` state
	 *
	 * @returns void due to internal mutation
	 */
	clearFiles: () => void;
	/**
	 * The internal files state, contains all the files the user currently has available to them
	 */
	files: File[];
	/**
	 * Removes a file from the internal file collection `files` via index
	 *
	 * @param _index - The index of the file to remove
	 * @returns void due to internal mutation
	 */
	removeFileByIndex: (_index: number) => void;
	/**
	 * Removes a files from the internal file collection `files` via name matching
	 *
	 * @param _name - The name of the file to remove
	 * @returns void due to internal mutation
	 */
	removeFileByName: (_name: string) => void;
	/**
	 * The File instance of the selected File
	 */
	selectedFile: File | undefined;
	/**
	 * The text of the selected file
	 */
	selectedFileText: string | undefined;
	/**
	 * Sets the selected file internal state by using the index to access the file at that index within the internal files array
	 */
	setSelectedFile: (_index: number) => void;
};
