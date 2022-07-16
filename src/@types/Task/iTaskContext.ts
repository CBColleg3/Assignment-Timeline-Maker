import type { Task } from "./Task";

/**
 * Type for the TaskContext Context object
 */
export type iTaskContext = {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
};
