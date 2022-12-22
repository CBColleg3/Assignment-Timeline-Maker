import React from "react";
import type { iTaskContext } from "src/@types";

/**
 * The context object, which contains either the TaskContext or undefined. Read more here: https://reactjs.org/docs/context.html
 * 
 * We provide the context to all children components using a component called `TaskContext.Provider` and giving it the initial value to provide to all it's children in it's `value` prop.
 * All children of the `TaskContext.Provider` component access/edit the context using the hook `useTaskContext` within it's own internal logic, because it is a child, it has access to the context.
 * 
 * TaskContext is a state that consists an object that contains the following keys:
 * - addTask
 *      - Adds a task to the collection of tasks. Takes in a task object and produces void.
 * - clearTasks
 *      - Clears all tasks from the collection
 * - deleteTask
 *      - Function that takes in an index specifying the index of which task to remove
 * - editTask
 *      - Edits a task using a function that takes in partial task data, the index where the edited task is, and whether the tasks date was changed (that is because when the date is changed, the timeline must re-render)
 * - insertTask
 *      - Inserts a task using a function that takes in a task `_task` and an index `_ind` into the `tasks` array
 * - moveTask
 *      - Moves a task using a function that takes in a from index `_from` and the to index `_to`, in-place mutation, so the function returns void.
 * - tasks
 *      - The array of tasks the user is currently rendering
 * - updateTasks
 *      - Updates the entire task collection by using a function that takes in an array of tasks `_tasks` and overrides it's internal tasks via mutation, therefore the function returns void
 * 
 */
export const TaskContext: React.Context<iTaskContext | undefined> = React.createContext<iTaskContext | undefined>(undefined);
