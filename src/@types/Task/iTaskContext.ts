import type { Task } from "./Task";

/**
 * Type for the TaskContext Context object
 */
export type iTaskContext = {
	/**
	 * Adds a task to the collection of tasks
	 *
	 * @param _task - The task to add to the collection, gets appended to the end
	 */
	addTask: (_task: Task) => void;
	/**
	 * Clears all tasks from the collection
	 *
	 * @returns void
	 */
	clearTasks: () => void;
	/**
	 * Deletes a task at `_ind` from the task collection
	 *
	 * @param _ind - The array index where the task that is being removed is located
	 * @returns void
	 */
	deleteTask: (_ind: number) => void;
	/**
	 * Edits a task with the partial task data `_task` at index `_ind`
	 *
	 * @param _task - The partial task date to edit the task at index `_ind` with
	 * @param _ind - The index where the task is located in the collection
	 * @param _dateChanged - checks whether the date has changed when editing the task
	 * @returns void
	 */
	editTask: (_task: Partial<Task>, _ind: number, _dateChanged?: boolean) => void;
	/**
	 * Inserts a task `_task` at index `_ind`
	 *
	 * @param _task - The task to insert into the collection
	 * @param _ind - The collection index where the task will be inserted
	 * @returns void
	 */
	insertTask: (_task: Task, _ind: number) => void;
	/**
	 * Moves a task from index `_from` to index `_to`
	 *
	 * @param _from - The from index
	 * @param _to - The to index
	 */
	moveTask: (_from: number, _to: number) => void;
	/**
	 * The collection of tasks
	 */
	tasks: Task[];
	/**
	 * Overrides the task collection `tasks` with the array sent in
	 *
	 * @param _tasks - The tasks array that will be overriding the internal `tasks` state
	 * @returns void
	 */
	updateTasks: (_tasks: Task[]) => void;
};
