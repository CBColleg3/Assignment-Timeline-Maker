/* eslint-disable @typescript-eslint/no-redundant-type-constituents -- disabled */
import React from "react";
import type { iFilesContext } from "src/@types";
import { FilesContext } from "./FilesContext";

/**
 * Custom hook for accessing the FilesContext value and returning it, if improperly accessed, an error is thrown.
 *
 * @returns FilesContext value if properly accessed
 */
export const useFilesContext = (): iFilesContext => {
	const contextValue: iFilesContext | undefined = React.useContext<iFilesContext | undefined>(
		FilesContext,
	);
	if (contextValue !== undefined) {
		return contextValue;
	}
	throw Error(
		"Attempting to access FilesContext from an component that is not a child of a FilesContext.Provider value",
	);
};
