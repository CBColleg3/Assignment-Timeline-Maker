import type { Task } from "./Task";

/**
 * Type for the TaskContext Context object
 */
export type iTaskContext = {
	tasks: Task[];
	setTasks: (_tasks: Task[]) => void;
};
