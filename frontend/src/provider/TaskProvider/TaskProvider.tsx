/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
/* eslint-disable @typescript-eslint/no-magic-numbers -- not needed for this file */
import React, { type ReactNode } from "react";
import type { iTaskContext, Task } from "src/@types";
import { TaskContext, useAssignmentDateInfoContext, useFilesContext } from "src/context";
import {
	findParts,
	findPoints,
	isSameDay,
	parseFileTextToXML,
	readFile,
	updateDueDates,
} from "src/helpers";

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
	const { selectedFileText } = useFilesContext();
	const { format, dates } = useAssignmentDateInfoContext();
	const [tasks, setTasks] = React.useState<Task[]>([]);
	const [confirmedEdit, setConfirmedEdit] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (confirmedEdit) {
			setConfirmedEdit(false);
			setTasks(updateDueDates(tasks, format, dates));
		}
	}, [confirmedEdit, format, dates, tasks]);

	React.useEffect(() => {
		if (selectedFileText !== undefined) {
			setTasks(updateDueDates(findPoints(findParts(selectedFileText)), format, dates));
		}
	}, [selectedFileText, dates, format]);

	const functionalProps: Partial<iTaskContext> = React.useMemo(
		() => ({
			addTask: (task: Task): void => setTasks((oldTasks) => [...oldTasks, task]),
			clearTasks: (): void => setTasks([]),
			deleteTask: (ind: number) => setTasks((oldTasks) => oldTasks.filter((_, i) => i !== ind)),
			editTask: (task: Partial<Task>, ind: number, changedDateOrPoints?: boolean): void => {
				if (changedDateOrPoints) {
					setTasks((oldTasks) => {
						if (oldTasks && task.dueDate) {
							const oldTask = oldTasks.splice(ind, 1)[0];
							const updatedTask = { ...oldTask, ...task };
							const index = oldTasks.findIndex((eachTask) => isSameDay(eachTask.dueDate, task?.dueDate));
							const oldTaskClone = [...oldTasks].map((eachTask) => ({ ...eachTask }));
							oldTaskClone.splice(index, 0, updatedTask);
							return oldTaskClone;
						}
						return oldTasks;
					});
					setConfirmedEdit(true);
				} else {
					setTasks((oldTasks) =>
						oldTasks.map((eachTask, i) => (i === ind ? { ...eachTask, ...task } : eachTask)),
					);
				}
			},
			insertTask: (task: Task, ind: number): void => {
				setTasks((oldTasks) => {
					if (oldTasks) {
						const tasksClone = [...oldTasks];
						tasksClone.splice(ind, 0, task);
						return tasksClone;
					}
					return oldTasks;
				});
			},
			moveTask: (from: number, to: number): void => {
				setTasks((oldTasks) => {
					if (oldTasks) {
						const fromTask = oldTasks[from];
						const tasksClone = [...oldTasks];
						tasksClone.splice(from, 1);
						if (to < from) {
							tasksClone.splice(to, 0, fromTask);
						} else if (to > from) {
							tasksClone.splice(to - 1, 0, fromTask);
						}
						return tasksClone;
					}
					return oldTasks;
				});
			},
			updateTasks: (newTasks: Task[]) => setTasks(newTasks),
		}),
		[],
	);

	const updateTasks = React.useCallback((newTasks: Task[]) => setTasks(newTasks), []);

	const taskMemo: iTaskContext = React.useMemo(
		() => ({
			...(functionalProps as unknown as iTaskContext),
			confirmedEdit,
			tasks,
			updateTasks,
		}),
		[confirmedEdit, functionalProps, tasks, updateTasks],
	);

	return <TaskContext.Provider value={taskMemo}>{children}</TaskContext.Provider>;
};