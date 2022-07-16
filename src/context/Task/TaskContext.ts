import React from "react";
import type { iTaskContext } from "src/@types";

/**
 * The context object, which contains either the TaskContext or undefined
 * 
 * Context is this state of an array of tasks (tasks) and a setter for that state as well (setTasks), to all components that are children of the Provider (TaskContext.Provider)
 */
export const TaskContext = React.createContext<iTaskContext>({ setTasks: () => undefined, tasks: [] });
