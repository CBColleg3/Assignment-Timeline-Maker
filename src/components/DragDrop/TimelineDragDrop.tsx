/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react";
import { AddRemoveTask } from "src/components/Task/AddRemove/AddRemoveTask";
import "./TimelineDragDrop.css";
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd";
import type { Task } from "src/@types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { TaskInfo } from "src/components/Task/Info/TaskInfo";

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
};

/**
 * TimelineDragDrop component, which houses the logic for rendering a drag and droppable timeline node component
 *
 * @param {TimelineDragDropProps} props Passed in props for the TimelineDragDrop component
 * @returns {JSX.Element} A drag-droppable timeline element
 */
export const TimelineDragDrop = ({ taskArray, setTaskArray }: TimelineDragDropProps): JSX.Element => {
	/**
	 * Handles the drag end operation
	 *
	 * @param result The result of the drop operation
	 */
	const OnDragEnd = (result: DropResult): void => {
		const { source, destination } = result;
		if (!destination) {
			return;
		}

		const movedTasks = [...taskArray].map((task: Task) => ({ ...task }));
		const [newOrder] = movedTasks.splice(source.index, 1);
		movedTasks.splice(destination.index, 0, newOrder);
		setTaskArray(movedTasks);
	};

	return (
		<DragDropContext onDragEnd={OnDragEnd}>
			<Droppable droppableId="vertical-timeline-element--work">
				{(provided): JSX.Element => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{taskArray.map((task, index) => (
							<Draggable
								draggableId={task.id.toString()}
								index={index}
								key={task.id}
							>
								{(prov): JSX.Element => (
									<span
										ref={prov.innerRef}
										{...prov.draggableProps}
										{...prov.dragHandleProps}
									>
										<VerticalTimelineElement
											className="vertical-timeline-element--work"
											contentStyle={{
												color: `#${task.color}`,
											}}
											iconStyle={{
												background: `#${task.color}`,
												color: "#fff",
											}}
										>
											<TaskInfo
												index={index}
												setTaskArray={(tasks: Task[]): void => setTaskArray(tasks)}
												taskArray={taskArray}
											/>
											<AddRemoveTask
												index={index}
												setTaskArray={(tasks: Task[]): void => setTaskArray(tasks)}
												taskArray={taskArray}
											/>
										</VerticalTimelineElement>
									</span>
								)}
							</Draggable>
						))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
