import React, { type ReactNode } from "react";
import type { iFilesContext } from "src/@types";
import { FilesContext } from "src/context";

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

	const functionalProps: Partial<iFilesContext> = React.useMemo(
		() => ({
			addFile: (_file: File) => setFiles((oldFiles: File[]) => [...oldFiles, _file]),
			addFiles: (_files: File[]) => setFiles((oldFiles: File[]) => [...oldFiles, ..._files]),
			clearFiles: () => setFiles([]),
			removeFileByIndex: (_index: number) =>
				setFiles((oldFiles: File[]) => oldFiles.filter((_, index) => index !== _index)),
			removeFileByName: (_name: string) =>
				setFiles((oldFiles: File[]) => oldFiles.filter((eachFile) => eachFile.name !== _name)),
			setSelectedFile: (_index: number) => setSelectedFile(files[_index]),
		}),
		[files],
	);

	const filesMemo: iFilesContext = React.useMemo(
		() => ({
			...(functionalProps as unknown as iFilesContext),
			files,
			selectedFile,
		}),
		[files, functionalProps, selectedFile],
	);

	return <FilesContext.Provider value={filesMemo}>{children}</FilesContext.Provider>;
};
