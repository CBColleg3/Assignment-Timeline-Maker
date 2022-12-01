import React from "react";
import type { iTaskContext } from "src/@types";
import { TaskContext } from "./TaskContext";

/**
 * Uses the TaskContext context (getting it's value), returning the value of the context
 *
 * @returns The TaskContext value. We throw an error if the task context we are accessing is undefined, meaning that
 * we are accessing the context from an invalid element, because context should only be accessed from elements that are children of the context's provider. Read more
 * about context here: https://reactjs.org/docs/context.html
 */
export const useTaskContext = (): iTaskContext => {
	/**
	 * The context from the created TaskContext, read more https://reactjs.org/docs/hooks-reference.html#usecontext
	 */
	const taskContext = React.useContext<iTaskContext | undefined>(TaskContext);
	if (taskContext) {
		return taskContext;
	}

	// Invalid usage, the reason for invalidity described in documentation of hook.
	throw Error(
		"Invalid usage of useTaskContext (must call it from a component that is a child of TaskContext.Provider)",
	);
};
