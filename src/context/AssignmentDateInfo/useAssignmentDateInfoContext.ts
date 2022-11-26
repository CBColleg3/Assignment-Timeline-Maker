import React from "react";
import type { iAssignmentDateInfoContext } from "src/@types/AssignmentDate/iAssignmentDateInfoContext";
import { AssignmentDateInfoContext } from "./AssignmentDateInfoContext";

/**
 * Uses the AssignmentDateInfo context (getting it's value), returning the value of the context
 *
 * @returns The AssignmentDateInfoContext value. We throw an error if the context we are accessing is undefined, meaning that
 * we are accessing the context from an invalid element, because context should only be accessed from elements that are children of the context's provider. Read more
 * about context here: https://reactjs.org/docs/context.html
 */
export const useAssignmentDateInfoContext = (): iAssignmentDateInfoContext => {
	const value = React.useContext(AssignmentDateInfoContext);
	if (value) {
		return value;
	}
	throw Error("Invalid usage of AssignmentDateInfoContext");
};
