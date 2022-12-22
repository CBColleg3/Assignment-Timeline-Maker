import type { Task } from "./Task";

/**
 * @deprecated
 * An entry in the cache, contains the tasks along with the parsed xml document
 */
export type TaskCacheEntry = {
	/**
	 * The tasks entered into the cache
	 */
	tasks: Task[];
};
