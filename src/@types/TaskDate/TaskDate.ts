import type { Task } from "../Task/Task";

export type TaskDate = {
	id: string;
    date: Date;
	tasks: Task[];
};
