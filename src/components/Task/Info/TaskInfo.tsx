import React from "react";
import type { Task } from "src/@types";
import { EditTask } from "src/components/Task/Edit/EditTask";

type TaskInfoProps = {
	task: Task;
	index: number;
};

/**
 *TaskInfo component, contains the title, points, document part, and due date text displayed on website
 *with clickable text to display a modal for the EditTask mode component
 *
 * @param {TaskInfoProps} props Passed in props from TaskInfo Component
 * @returns {JSX.Element} Info displayed for the user about each task
 */
export const TaskInfo = ({ task, index }: TaskInfoProps): JSX.Element => {
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
				{task.document}
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
				{new Date(task.dueDate).toDateString()}
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
