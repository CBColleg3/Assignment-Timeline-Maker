import React from "react";
import { AddRemoveTask } from "./AddRemoveTask";
import "./TimelineDragDrop.css";
import {
	DragDropContext,
	Droppable,
	Draggable,
	type DropResult,
} from "react-beautiful-dnd";
import type { Task } from "../templates/task";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { TaskInfo } from "./TaskInfo";

/**
 * Props for the TimelineDragDrop component
 */
type TimelineDragDropProps = {
	/**
	 * Tasks in the document
	 */
	taskArray: Task[];
	/**
	 * Setter for updating the tasks in the document
	 */
	setTaskArray: (tasks: Task[]) => void;
	/**
	 * Time when the task starts
	 */
	startDate: Date;
	/**
	 * Time when the task ends
	 */
	endDate: Date;
};

/**
 * TimelineDragDrop component, which houses the logic for rendering a drag and droppable timeline node component
 *
 * @param {TimelineDragDropProps} props Passed in props for the TimelineDragDrop component
 * @returns {JSX.Element} A drag-droppable timeline element
 */
export function TimelineDragDrop({
	taskArray,
	setTaskArray,
	startDate,
	endDate,
}: TimelineDragDropProps): JSX.Element {
	const OnDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (!destination) return;

		const movedTasks = [...taskArray].map((task: Task) => {
			return { ...task };
		});
		const [newOrder] = movedTasks.splice(source.index, 1);
		movedTasks.splice(destination.index, 0, newOrder);
		setTaskArray(movedTasks);
	};

	return (
		<DragDropContext onDragEnd={OnDragEnd}>
			<Droppable droppableId="vertical-timeline-element--work">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{taskArray.map((task, index) => {
							return (
								<Draggable key={task.id} draggableId={task.id.toString()} index={index}>
									{(provided, snapshot) => (
										<span
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<VerticalTimelineElement
												className="vertical-timeline-element--work"
												iconStyle={{
													background: "#" + task.color,
													color: "#fff",
												}}
												contentStyle={{
													color: "#" + task.color,
												}}
											>
												<TaskInfo
													taskArray={taskArray}
													setTaskArray={(tasks) => setTaskArray(tasks)}
													index={index}
												></TaskInfo>
												<AddRemoveTask
													taskArray={taskArray}
													setTaskArray={(tasks) => setTaskArray(tasks)}
													index={index}
												></AddRemoveTask>
											</VerticalTimelineElement>
										</span>
									)}
								</Draggable>
							);
						})}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
