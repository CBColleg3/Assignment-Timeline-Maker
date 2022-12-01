import React from "react";
import type { iFilesContext } from "src/@types";

/**
 * The context object, which contains either the context value or undefined. Read more about context here: https://reactjs.org/docs/context.html
 * 
 * We provide the context value to all children components of the FilesContext.Provider component via the FilesProvider component located in the `provider` folder, that is an HOC component that initializes the context value & simultaneously sends the context value to all children.
 * 
 * FilesContext's value is an object that consists of the following keys:
 * - addFile
 * 	- A function that takes in an file argument `_file` and adds it to the internal array of files. Returns void
 * 
 * - addFiles
 * 	- A function that takes in an array of files, called `_files` and adds it to the internal array of files. Returns void
 * 
 * - clearFiles
 * 	- A function that clears all the files from the current internal collection of files. Returns void
 * 
 * - files
 * 	- The internal array of files that is mutated by all functions involving it. Holds all currently uploaded and available files
 * 
 * - updateSelectedFile
 * 	- A function that takes in the index of the file, which is located in the files array.
 * 
 * - removeFileByIndex
 * 	- A function that takes in an index, signifying the index of the file to remove in relation to it's location within the internal files array, `files`
 * 
 * - removeFileByName
 * 	- A function that takes in an name, signifying the name of a file in the `files` array that contains the name supplied
 * 
 * - selectedFile
 * 	- The currently selected file, which is selected by the user clicking on the file when it is visible within the file list
 * 
 * - selectedFileText
 * 	- The currently selected file text, which is populated each time the user selects the file
 * 
 * - selectedFileXML
 * 	- The parsed XML from the selected file, is reset and recalculated each time a different file is selected.
 * 
 */
export const FilesContext: React.Context<iFilesContext | undefined> = React.createContext<
	iFilesContext | undefined
>(undefined);
