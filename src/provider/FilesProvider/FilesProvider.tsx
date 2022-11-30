import React, { type ReactNode } from "react";
import type { iFilesContext } from "src/@types";
import { FilesContext } from "src/context";
import { parseFileTextToXML, readFile } from "src/helpers";

type FilesProviderProperties = {
	children: ReactNode;
};

/**
 * HOC component utilizing and properly memoizing all the functional props being sent to it's children
 *
 * @param properties - The properties of this Provider HOC component
 * @param properties.children - The children that this HOC component wraps around
 * @returns - The HOC provider component that provides all children access to it's state
 */
export const FilesProvider = ({ children }: FilesProviderProperties): JSX.Element => {
	const [files, setFiles] = React.useState<File[]>([]);
	const [selectedFile, setSelectedFile] = React.useState<File>();
	const [selectedFileText, setSelectedFileText] = React.useState<string>();
	const [selectedFileXML, setSelectedFileXML] = React.useState<Document | undefined>(undefined);
	const [removingFile, setRemovingFile] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (removingFile) {
			console.log("resetting all values");
			setSelectedFileXML(undefined);
			setRemovingFile(false);
			setSelectedFile(undefined);
			setSelectedFileText(undefined);
		}
	}, [removingFile]);

	const functionalProps: Partial<iFilesContext> = React.useMemo(
		() => ({
			addFile: (_file: File) => setFiles((oldFiles: File[]) => [...oldFiles, _file]),
			addFiles: (_files: File[]) => setFiles((oldFiles: File[]) => [...oldFiles, ..._files]),
			clearFiles: () => setFiles([]),
			removeFileByIndex: (_index: number): void => {
				console.log("calling remove index");
				setRemovingFile(true);
				setFiles((oldFiles: File[]) => oldFiles.filter((_, index) => index !== _index));
			},
			removeFileByName: (_name: string): void => {
				console.log("calling remove name");
				setRemovingFile(true);
				setFiles((oldFiles: File[]) => oldFiles.filter((eachFile) => eachFile.name !== _name));
			},
			updateSelectedFile: (_index: number): void => {
				console.log("updating file");
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

	return <FilesContext.Provider value={filesMemo}>{children}</FilesContext.Provider>;
};
