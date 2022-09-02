import React from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { useTaskContext } from "src/context";
import { renderOverlayTriggerTooltip } from "src/helpers/shared/renderOverlayTriggerTooltip";
import styles from "./AddRemoveTask.module.css";
import { generateNewTask } from "src/helpers/Task/generateNewTask";

/**
 * Props for the AddRemoveTask component
 */
type AddRemoveTaskProps = {
	/**
	 * Current task index in the array of tasks
	 */
	index: number;
};

/**
 * Functions for adding and removing tasks
 *
 * @param {AddRemoveTaskProps} props The properties of the component
 * @returns {JSX.Element} AddRemoveTask component, that houses the logic for updating a singular task in the array of tasks
 */
export const AddRemoveTask = ({ index }: AddRemoveTaskProps): JSX.Element => {
	const { tasks, insertTask, deleteTask } = useTaskContext();

	/**
	 * This function adds a part right below the task you've selected.
	 *
	 * @param ind current task index in the array of tasks
	 */
	const addPart = React.useCallback(
		(color: string, dueDate: Date, ind: number, id: number) => {
			const genericTask = generateNewTask(color, dueDate, ind, id);
			insertTask(genericTask, ind);
		},
		[insertTask],
	);

	/**
	 * This function removes the current task you're on.
	 *
	 * @param ind - current task index in the array of tasks
	 * @returns void
	 */
	const removePart = React.useCallback((ind: number): void => deleteTask(ind), [deleteTask]);

	return (
		<div className="d-flex flex-row justify-content-start mt-4">
			<OverlayTrigger
				delay={{ hide: 400, show: 200 }}
				overlay={(props: OverlayInjectedProps): JSX.Element =>
					renderOverlayTriggerTooltip(props, "Add Task")
				}
				placement="bottom"
			>
				<Button
					className="me-2 rounded-circle"
					onClick={(): void => addPart(tasks[index].color, tasks[index].dueDate, index, tasks.length)}
					variant="outline-success"
				>
					<FontAwesomeIcon
						className={styles.fontawesome_buttons}
						icon={faPlus}
					/>
				</Button>
			</OverlayTrigger>
			<OverlayTrigger
				delay={{ hide: 300, show: 200 }}
				overlay={(props: OverlayInjectedProps): JSX.Element =>
					renderOverlayTriggerTooltip(props, "Remove Task")
				}
				placement="bottom"
			>
				<Button
					className="ms-1 rounded-circle"
					onClick={(): void => removePart(index)}
					variant="outline-danger"
				>
					<FontAwesomeIcon
						className={styles.fontawesome_buttons}
						icon={faMinus}
					/>
				</Button>
			</OverlayTrigger>
		</div>
	);
};
