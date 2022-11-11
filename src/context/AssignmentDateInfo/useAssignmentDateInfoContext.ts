import React from "react";
import type { iAssignmentDateInfoContext } from "src/@types/AssignmentDate/iAssignmentDateInfoContext";
import { AssignmentDateInfoContext } from "./AssignmentDateInfoContext";

/**
 * Gathers the `AssignmentDateInfoContext` value, or throws error if used incorrectly
 *
 * @returns The context value, or throws error if no context is available (meaning you're using it outside a component that is a child of the context provider)
 */
export const useAssignmentDateInfoContext = (): iAssignmentDateInfoContext => {
	const value = React.useContext(AssignmentDateInfoContext);
	if (value) {
		return value;
	}
	throw Error("Invalid usage of AssignmentDateInfoContext");
};
