import React from "react";
import type { iTaskContext } from "src/@types";

/**
 * The context object, which contains either the TaskContext or undefined
 */
export const TaskContext = React.createContext<iTaskContext>({ setTasks: () => undefined, tasks: [] });
