import type { Task } from "./Task";

/**
 * @deprecated
 * Task collection helper type, allows us to store the tasks within an object, and also
 */
export type TaskCollection = {
	/**
	 * The id of the TaskCollection
	 */
	id: string;
	/**
	 * The tasks within the collection
	 */
	tasks: Task[];
};
