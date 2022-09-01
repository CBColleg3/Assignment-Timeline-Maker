/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react";
import { AddRemoveTask } from "src/components/Task/AddRemove/AddRemoveTask";
import "./TimelineDragDrop.css";
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd";
import type { AssignmentDate, Task } from "src/@types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { TaskInfo } from "src/components/Task/Info/TaskInfo";
import { useTaskContext } from "src/context";
import { changeTaskColor } from "src/helpers/DragDrop/ChangeTaskColor";

/**
 * TimelineDragDrop component, which houses the logic for rendering a drag and droppable timeline node component
 *
 *@param {TimelineDragDropProps} timeline drag drop props from Timeline
 * @returns {JSX.Element} A drag-droppable timeline element
 */
export const TimelineDragDrop = (): JSX.Element => {
	const { tasks, updateTasks } = useTaskContext();
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

		const movedTasks = [...tasks].map((task: Task) => ({ ...task }));

		const [newOrder] = movedTasks.splice(source.index, 1);
		movedTasks.splice(destination.index, 0, newOrder);
		const recoloredTasks = changeTaskColor(movedTasks, destination.index);
		updateTasks(recoloredTasks);
	};

	return (
		<DragDropContext onDragEnd={OnDragEnd}>
			<Droppable droppableId="vertical-timeline-element--work">
				{(provided): JSX.Element => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{tasks.map((task: Task, index: number) => (
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
												boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
												color: `#${task.color}`,
												marginBottom: "20px",
											}}
											iconStyle={{
												background: `#${task.color}`,
												color: "#fff",
											}}
											id={`${task.name}-${task.id}`}
										>
											<TaskInfo
												index={index}
												task={task}
											/>
											<AddRemoveTask index={index} />
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
