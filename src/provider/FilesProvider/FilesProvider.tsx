import React, { type ReactNode } from "react";
import type { iFilesContext } from "src/@types";
import { FilesContext } from "src/context";
import { parseFileTextToXML, readFile } from "src/helpers";

type FilesProviderProperties = {
	children: ReactNode;
};

/**
 * HOC that passes down the task context to any child.
 * - **Read more about HOC components: https://reactjs.org/docs/higher-order-components.html.**
 * - **Read more about context: https://reactjs.org/docs/context.html**
 *
 * @param props The properties of the component, read more about properties here: https://reactjs.org/docs/components-and-props.html
 * @param props.children The child component that will be receiving the files context, read more about the special children prop here: https://reactjs.org/docs/composition-vs-inheritance.html *(Containment section)*
 * @returns The wrapped child component
 */
export const FilesProvider = ({ children }: FilesProviderProperties): JSX.Element => {
	/**
	 * The list of files the user currently has imported. Initialized as an empty list to avoid any bugs with undefined. Is populated as the user adds files from the upload component, or
	 * removes files from the 
	 */
	const [files, setFiles] = React.useState<File[]>([]);
	/**
	 * The currently selected file. The file which the user selects from the list of files, highlighted in blue as soon as the user selects it.
	 */
	const [selectedFile, setSelectedFile] = React.useState<File>();
	/**
	 * The parsed text of the file, utilized in places where the tasks need to be generated, or generally when the file text is required.
	 */
	const [selectedFileText, setSelectedFileText] = React.useState<string>();
	/**
	 * The XML of the selected file, used in the DocViewer component to render the selected file.
	 */
	const [selectedFileXML, setSelectedFileXML] = React.useState<Document | undefined>(undefined);
	/**
	 * Boolean indicator when the user is removing a file, removes the file from the state.
	 */
	const [removingFile, setRemovingFile] = React.useState<boolean>(false);

	/**
	 * The React useEffect hook that fires when the state `removingFile` changes. This is because the `removingFile` state only changes when the user is confirmed to have removed
	 * a file from the list of files displayed in the top-center of the screen. When that occurs, all data related to the file is removed. Read more about the `useEffect` hook here: https://reactjs.org/docs/hooks-effect.html
	 */
	React.useEffect(() => {
		if (removingFile) {
			setSelectedFileXML(undefined);
			setRemovingFile(false);
			setSelectedFile(undefined);
			setSelectedFileText(undefined);
		}
	}, [removingFile]);

	/**
	 * 	 * This is a little more complicated then the useEffects above. This is using the `useMemo` hook, which is a powerful hook if used correctly. The general standard practice is, when dealing with
	 * objects, and specifically using them to supply the Provider a value. You must memoize them or else it results in lots of unnecessary re-renders. This is basically, memoizing the functional props of
	 * the provider, and making it so whenever we try to recalculate the value of `functionalProps`, we check if the dependency is completely different from the past one, and that the value of the dependency is not
	 * the same as the one before the changed one. If that is the case, then we already have calculated the value, so therefore we just return the value without running any complex computations. This is especially helpful for
	 * objects. React has a tendency to treat values as different by examining their memory addresses, an object can have completely the same values, but if it differs in the memory address, then React treats it as a different value.
	 * You can read more about the useMemo hook here: https://reactjs.org/docs/hooks-reference.html#usememo
	 * --
	 * Specifically, this property is memoized to prevent unecessary renders where the object is technically different but the contents are different, which is a common practice when utilizing objects
	 * and Provider values.
	 */
	const functionalProps: Partial<iFilesContext> = React.useMemo(
		() => ({
			addFile: (_file: File) => setFiles((oldFiles: File[]) => [...oldFiles, _file]),
			addFiles: (_files: File[]) => setFiles((oldFiles: File[]) => [...oldFiles, ..._files]),
			clearFiles: () => setFiles([]),
			removeFileByIndex: (_index: number): void => {
				setRemovingFile(true);
				setFiles((oldFiles: File[]) => oldFiles.filter((_, index) => index !== _index));
			},
			removeFileByName: (_name: string): void => {
				setRemovingFile(true);
				setFiles((oldFiles: File[]) => oldFiles.filter((eachFile) => eachFile.name !== _name));
			},
			updateSelectedFile: (_index: number): void => {
				setSelectedFile(files[_index]);
				readFile(files[_index])
					.then((result: string | undefined) => {
						setSelectedFileText(result);
						const parsedFileText: Document = parseFileTextToXML(result);
						setSelectedFileXML(parsedFileText);
					})
					.catch((error: unknown) => {
						console.error(`Failed to read file ${(error as Error).stack}`);
					});
			},
		}),
		[files],
	);

	/**
	 * We apply the same practice as described above, and make sure that we memoize our Provider value, **especially** if it is an object. This will save us a ton of unnecessary renders.
	 * --
	 * What this object, `filesMemo` is specifically doing, is combining both the `functionalProps` described above, with the local state of this provider. They combine together to form
	 * a fully complete iFilesContext value. Which we then pass into the Provider's value, for the children to consume it.
	 */
	const filesMemo: iFilesContext = React.useMemo(
		() => ({
			...(functionalProps as unknown as iFilesContext),
			files,
			selectedFile,
			selectedFileText,
			selectedFileXML,
		}),
		[files, functionalProps, selectedFile, selectedFileText, selectedFileXML],
	);

	/**
	 * Returning FilesContext.Provider that is providing the memoized object as the value to all it's children.
	 */
	return <FilesContext.Provider value={filesMemo}>{children}</FilesContext.Provider>;
};
