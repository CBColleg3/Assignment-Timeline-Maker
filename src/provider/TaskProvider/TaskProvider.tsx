/* eslint-disable @typescript-eslint/no-magic-numbers -- not needed for this file */
import React, { type ReactNode } from "react";
import type { iTaskContext, Task } from "src/@types";
import { TaskContext } from "src/context";
import { findParts, findPoints } from "src/helpers";

type TaskProviderProps = {
	children: ReactNode;
};

/**
 * HOC that passes down the task context to any child
 *
 * @param props The properties of the component
 * @param props.children The child component that will be receiving the task context
 * @returns The wrapped child component
 */
export const TaskProvider = ({ children }: TaskProviderProps): JSX.Element => {
	const [tasks, setTasks] = React.useState<Task[]>([]);

	const updateTasks = React.useCallback((newTasks: Task[]) => setTasks(newTasks), []);

	const taskMemo: iTaskContext = React.useMemo(
		() => ({
			addTask: (task: Task): void => setTasks([...tasks, task]),
			clearTasks: (): void => setTasks([]),
			deleteTask: (ind: number) => setTasks((oldTasks) => oldTasks.filter((_, i) => i !== ind)),
			editTask: (task: Partial<Task>, ind: number) =>
				setTasks((oldTasks) => oldTasks.map((eachTask, i) => (i === ind ? { ...eachTask, ...task } : eachTask))),
			insertTask: (task: Task, ind: number): void => {
				const tasksClone = [...tasks];
				tasksClone.splice(ind, 0, task);
				setTasks(tasksClone);
			},
			moveTask: (from: number, to: number): void => {
				const fromTask = tasks[from];
				const tasksClone = [...tasks];
				tasksClone.splice(from, 1);
				if (to < from) {
					tasksClone.splice(to, 0, fromTask);
				} else if (to > from) {
					tasksClone.splice(to - 1, 0, fromTask);
				}
				setTasks(tasksClone);
			},
			tasks,
			updateTasks,
		}),
		[tasks, updateTasks],
	);

	return <TaskContext.Provider value={taskMemo}>{children}</TaskContext.Provider>;
};
