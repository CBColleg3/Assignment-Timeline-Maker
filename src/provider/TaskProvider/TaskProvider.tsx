/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
/* eslint-disable @typescript-eslint/no-magic-numbers -- not needed for this file */
import React, { type ReactNode } from "react";
import type { iTaskContext, Task } from "src/@types";
import { TaskContext, useAssignmentDateInfoContext, useFilesContext } from "src/context";
import { findParts, findPoints, isSameDay, updateDueDates } from "src/helpers";

type TaskProviderProps = {
	children: ReactNode;
};

/**
 * HOC that passes down the task context to any child.
 * - **Read more about HOC components: https://reactjs.org/docs/higher-order-components.html.**
 * - **Read more about context: https://reactjs.org/docs/context.html**
 *
 * @param props The properties of the component, read more about properties here: https://reactjs.org/docs/components-and-props.html
 * @param props.children The child component that will be receiving the task context, read more about the special children prop here: https://reactjs.org/docs/composition-vs-inheritance.html *(Containment section)*
 * @returns The wrapped child component
 */
export const TaskProvider = ({ children }: TaskProviderProps): JSX.Element => {
	/**
	 * Accessing the FilesContext state. We are using this specific state `selectedFileText` to have the capability of auto-generating our tasks the moment a user decides
	 * to edit a task's points or date.
	 */
	const { selectedFileText } = useFilesContext();
	/**
	 * Accessing the AssignmentDateInfoContext value of both `format` and `dates`, which we will use within our hooks to ensure the tasks are being properly instantiated.
	 */
	const { changingFormat, format, dates } = useAssignmentDateInfoContext();
	/**
	 * This is the local state, which is the collection of tasks that is parsed from the file text. This is instantiated only when the user selects a file, and that file
	 * contains the proper tasks.
	 */
	const [tasks, setTasks] = React.useState<Task[]>([]);
	/**
	 * This is a local state, that will be edited from the Timeline itself. When we confirm editing a task, this will change **only if** the user either changes the date or points for a task.
	 * If none of those fields are edited, then this state stays the same. This state is the primary controller of the first useEffect below this local state.
	 */
	const [confirmedEdit, setConfirmedEdit] = React.useState<boolean>(false);

	/**
	 * Triggers when either `confirmedEdit`, `format`, `dates`, or `tasks` changes values. Only has an effect when `confirmedEdit` is true.
	 * --
	 * Confirmed edit is true when the user confirms editing a task, which then we have to recalculate the dates, because the user
	 * either edited the date of the task, or edited the # of points the task is worth, if those two fields are not edited, then we
	 * determine the recalculating unnecessary. Read more about the `useEffect` hook here: https://reactjs.org/docs/hooks-effect.html
	 */
	React.useEffect(() => {
		if (confirmedEdit) {
			setConfirmedEdit(false);
			setTasks(updateDueDates(tasks, format, dates));
		}
	}, [confirmedEdit, format, dates, tasks]);

	/**
	 * Triggers when either `selectedFileText`, `dates`, or `format` changes values. Only has an effect if `selectedFileText` is not undefined
	 * --
	 * When `selectedFileText` is not undefined, it determines that we must have selected a file, therefore we generate tasks from the selectedFileText, passing in the format, and AssignmentDate(s).
	 * This is because when we select a file, we want to simultaneously generate the tasks as well, without requiring the user to click a button.
	 */
	React.useEffect(() => {
		if (selectedFileText !== undefined) {
			setTasks(updateDueDates(findPoints(findParts(selectedFileText)), format, dates));
		}
	}, [selectedFileText, dates, format]);

	React.useEffect(() => {
		if (changingFormat && dates !== undefined) {
			console.log("in useEffect for updating task due dates", dates);
			setTasks((oldTasks) => updateDueDates(oldTasks, format, dates));
		}
	}, [changingFormat, dates, format]);

	/**
	 * This is a little more complicated then the useEffects above. This is using the `useMemo` hook, which is a powerful hook if used correctly. The general standard practice is, when dealing with
	 * objects, and specifically using them to supply the Provider a value. You must memoize them or else it results in lots of unnecessary re-renders. This is basically, memoizing the functional props of
	 * the provider, and making it so whenever we try to recalculate the value of `functionalProps`, we check if the dependency is completely different from the past one, and that the value of the dependency is not
	 * the same as the one before the changed one. If that is the case, then we already have calculated the value, so therefore we just return the value without running any complex computations. This is especially helpful for
	 * objects. React has a tendency to treat values as different by examining their memory addresses, an object can have completely the same values, but if it differs in the memory address, then React treats it as a different value.
	 * You can read more about the useMemo hook here: https://reactjs.org/docs/hooks-reference.html#usememo
	 * --
	 * To describe the context of why this hook is here particularly. The reason described above with general practice of using this hook when passing objects as Provider values, and also. This serves the purpose of containing all our
	 * functions in the iTaskContext, in one object, so therefore making it easier to manage, debug, and maintain. We initialize and define all the functional properties of the iTaskContext value here, and then pass that value into the Provider's value.
	 */
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

	/**
	 * We apply the same practice as described above, and make sure that we memoize our Provider value, **especially** if it is an object. This will save us a ton of unnecessary renders.
	 * --
	 * What this object, `taskMemo` is specifically doing, is combining both the `functionalProps` described above, with the local state of this provider. They combine together to form
	 * a fully complete iTaskContext value. Which we then pass into the Provider's value, for the children to consume it.
	 */
	const taskMemo: iTaskContext = React.useMemo(
		() => ({
			...(functionalProps as unknown as iTaskContext),
			confirmedEdit,
			tasks,
		}),
		[confirmedEdit, functionalProps, tasks],
	);

	/**
	 * Returning the Provider with the memoized value wrapping around it's children prop, which is linked and described to above.
	 */
	return <TaskContext.Provider value={taskMemo}>{children}</TaskContext.Provider>;
};
