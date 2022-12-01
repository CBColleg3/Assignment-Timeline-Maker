export type Task = {
	/**
	 * The name of the task, aka the title
	 */
	name: string;
	/**
	 * The id of the task
	 */
	id: number;
	/**
	 * The description of the task
	 */
	description: string;
	/**
	 * The points of the task
	 */
	points: number;
	/**
	 * The color of the task, hex format
	 */
	color: string;
	/**
	 * The due date of the task
	 */
	dueDate: Date;
	/**
	 * @deprecated
	 */
	autoDueDate: boolean;
};
