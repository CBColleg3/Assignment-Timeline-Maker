import type { Task } from "./Task";

/**
 * Task collection helper type, allows us to store the tasks within an object, and also
 */
export type TaskCollection = {
	id: string;
	tasks: Task[];
};
