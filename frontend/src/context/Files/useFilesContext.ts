/* eslint-disable @typescript-eslint/no-redundant-type-constituents -- disabled */
import React from "react";
import type { iFilesContext } from "src/@types";
import { FilesContext } from "./FilesContext";

/**
 * Uses the FilesContext context (getting it's value), returning the value of the context
 *
 * @returns The FilesContext value. We throw an error if the task context we are accessing is undefined, meaning that
 * we are accessing the context from an invalid element, because context should only be accessed from elements that are children of the context's provider. Read more
 * about context here: https://reactjs.org/docs/context.html
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
