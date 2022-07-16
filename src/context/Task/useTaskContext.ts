import React from "react";
import type { iTaskContext } from "src/@types";
import { TaskContext } from "./TaskContext";

/**
 * Uses the task context, returning the value of the context or undefined
 *
 * @returns The TaskContext value or throws if TaskContext value is undefined
 */
export const useTaskContext = (): iTaskContext => {
	const taskContext = React.useContext<iTaskContext>(TaskContext);
	return taskContext;
};
