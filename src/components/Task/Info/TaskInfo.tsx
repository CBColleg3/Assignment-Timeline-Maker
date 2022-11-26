import React from "react";
import type { Task } from "src/@types";
import { EditTask } from "src/components/Task/Edit/EditTask";
import { useAssignmentDateInfoContext } from "src/context";

/**
 * The properties of the TaskInfo component
 */
type TaskInfoProps = {
	/**
	 * The task object itself
	 */
	task: Task;
	/**
	 * The index of the task
	 */
	index: number;
};

/**
 *TaskInfo component, contains the title, points, document part, and due date text displayed on website
 *with clickable text to display a modal for the EditTask mode component
 *
 * @param props Passed in props from TaskInfo Component
 * @param props.task - The task object itself
 * @param props.index - The index of the task within the internal tasks array
 * @returns {JSX.Element} Info displayed for the user about each task
 */
export const TaskInfo = ({ task, index }: TaskInfoProps): JSX.Element => {
	const { format } = useAssignmentDateInfoContext();
	const [editMode, setEditMode] = React.useState<boolean>(false);
	return (
		<div>
			<h3
				className="clickable_text"
				onClick={(): void => {
					setEditMode(!editMode);
				}}
			>
				{task.name}
			</h3>
			<h5
				className="clickable_text"
				onClick={(): void => {
					setEditMode(!editMode);
				}}
			>
				{task.description}
			</h5>
			<h4
				className="clickable_text"
				onClick={(): void => {
					setEditMode(!editMode);
				}}
			>
				{task.points} {"Points"}
			</h4>
			<h5
				className="clickable_text"
				onClick={(): void => {
					setEditMode(!editMode);
				}}
			>
				{format === "day" && <span>{new Date(task.dueDate).toDateString()}</span>}
				{format === "hour" && (
					<span>
						{new Date(task.dueDate).toLocaleTimeString()} {new Date(task.dueDate).toLocaleDateString()}
					</span>
				)}
			</h5>

			<EditTask
				editMode={editMode}
				index={index}
				setEditMode={setEditMode}
				task={task}
			/>
		</div>
	);
};
