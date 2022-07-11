import React from "react";
import type { Task } from "../templates/task";
import { EditTask } from "./EditTask";

type TaskInfoProps = {
	taskArray: Task[];
	setTaskArray: (taskArray: Task[]) => void;
	index: number;
};

/**
 *TaskInfo component, contains the title, points, document part, and due date text displayed on website
 *with clickable text to display a modal for the EditTask mode component
 *
 * @param {TaskInfoProps} props Passed in props from TaskInfo Component
 * @returns {JSX.Element} Info displayed for the user about each task
 */
export function TaskInfo({
	taskArray,
	setTaskArray,
	index,
}: TaskInfoProps
): JSX.Element {
	const [editMode, setEditMode] = React.useState<boolean>(false);

	return (
		<div>
			<h3
				className="clickable_text"
				onClick={() => {
					setEditMode(!editMode);
				}}
			>
				{taskArray[index].name}
			</h3>
			<h5
				className="clickable_text"
				onClick={() => {
					setEditMode(!editMode);
				}}
			>
				{taskArray[index].document}
			</h5>
			<h4
				className="clickable_text"
				onClick={() => {
					setEditMode(!editMode);
				}}
			>
				{taskArray[index].points} Points
			</h4>
			<h5
				className="clickable_text"
				onClick={() => {
					setEditMode(!editMode);
				}}
			>
				{taskArray[index].dueDate.toDateString()}
			</h5>

			<EditTask
				taskArray={taskArray}
				setTaskArray={(tasks) => setTaskArray(tasks)}
				index={index}
				editMode={editMode}
				setEditMode={setEditMode}
			/>
		</div>
	);
}
