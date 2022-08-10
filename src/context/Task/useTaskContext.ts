import React from "react";
import type { iTaskContext } from "src/@types";
import { TaskContext } from "./TaskContext";

/**
 * Uses the task context (getting it's value), returning the value of the context
 *
 * @returns The TaskContext value (tasks, setTasks)
 */
export const useTaskContext = (): iTaskContext => {
	const taskContext = React.useContext<iTaskContext>(TaskContext);
	return taskContext;
};
