/**
 * @deprecated
 * A collection of files, and the index of the current file selected
 */
export type FileCollection = {
	/**
	 * The array of currently uploaded files
	 */
	files: File[];
	/**
	 * The index of the current file selected
	 */
	fileSelected: number;
};
