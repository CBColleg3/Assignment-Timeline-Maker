import React from "react";
import { AddRemoveTask } from "./AddRemoveTask";
import { EditTask } from "./EditTask";
import {
	DragDropContext,
	Droppable,
	Draggable,
	type DropResult,
} from "react-beautiful-dnd";
import type { Task } from "../templates/task";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

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
					<div
						className="vertical-timeline-element--work"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
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
													background: `rgb(${task.color + 100},100,150)`,
													color: "#fff",
												}}
											>
												<h3 className="vertical-timeline-element-title">{task.name}</h3>
												<h5>{task.document}</h5>
												<h4>{task.points} Points</h4>
												<h5>{task.dueDate.toDateString()}</h5>
												<AddRemoveTask
													taskArray={taskArray}
													setTaskArray={(tasks) => setTaskArray(tasks)}
													index={index}
												></AddRemoveTask>
												<EditTask
													taskArray={taskArray}
													setTaskArray={(tasks) => setTaskArray(tasks)}
													index={index}
												/>
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
