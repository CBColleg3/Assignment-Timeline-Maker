import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import type { Task } from "src/@types";
import { useTaskContext } from "src/context";
import { renderOverlayTriggerTooltip } from "src/helpers/shared/renderOverlayTriggerTooltip";

const CONSTANTS = {
	RANDOM_COLOR_BASE_IND: 0,
	RANDOM_NUMBER_FORMULA_CONSTANT_INC: 1,
	TASK_INDEX_INC: 1,
	UPDATE_DAY_COUNTER_INC: 1,
	UPDATE_LOOP_INC: 1,
	UPDATE_POINT_SUM_VAL: 0,
};

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
	const { tasks, updateTasks } = useTaskContext();
	const IND_INC = 1;
	const MODIFIED_TASK_SPLICE_DELETE_COUNT = 0;
	const MODIFIED_PTS_SPLICE_DELETE_COUNT = 1;

	/**
	 * This function adds a part right below the task you've selected.
	 *
	 * @param ind current task index in the array of tasks
	 */
	function addPart(ind: number): void {
		const modifiedTaskArr: Task[] = [...tasks].map((eachTask) => ({
			...eachTask,
			dueDate: new Date(eachTask.dueDate),
		}));
		modifiedTaskArr.splice(ind + IND_INC, MODIFIED_TASK_SPLICE_DELETE_COUNT, {
			autoDueDate: false,
			color: tasks[index].color,
			description: "Type Document Text Here.",
			dueDate: tasks[index].dueDate,
			id: modifiedTaskArr.length + CONSTANTS.TASK_INDEX_INC,
			name: "New Task",
			points: 0,
		});
		updateTasks(modifiedTaskArr);
	}

	/**
	 * This function removes the current task you're on.
	 *
	 * @param {number} ind current task index in the array of tasks
	 */
	function removePart(ind: number): void {
		const modifiedPtsArr = [...tasks].map((eachTask) => ({
			...eachTask,
			dueDate: new Date(eachTask.dueDate),
		}));
		modifiedPtsArr.splice(ind, MODIFIED_PTS_SPLICE_DELETE_COUNT);
		updateTasks(modifiedPtsArr);
	}

	return (
		<div className="d-flex flex-row justify-content-start mt-4">
			<OverlayTrigger
				overlay={(props: OverlayInjectedProps): JSX.Element =>
					renderOverlayTriggerTooltip(props, "Add Task")
				}
				placement="bottom"
			>
				<Button
					className="me-2 rounded-circle"
					onClick={(): void => addPart(index)}
					variant="outline-success"
				>
					<FontAwesomeIcon icon={faPlus} />
				</Button>
			</OverlayTrigger>
			<OverlayTrigger
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
					<FontAwesomeIcon icon={faMinus} />
				</Button>
			</OverlayTrigger>
		</div>
	);
};
