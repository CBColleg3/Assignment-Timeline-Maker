import React from "react";
import { AddRemoveTask } from "../Task/AddRemove/AddRemoveTask";
import { EditTask } from "../Task/Edit/EditTask";
import {
	DragDropContext,
	Droppable,
	Draggable,
	type DropResult,
} from "react-beautiful-dnd";
import type { Task } from "../../@types/Task";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

const SPLICE_OP_NO_DELETE = 0;

const TASK_COLOR_INC = 100;

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
export const TimelineDragDrop = ({
	taskArray,
	setTaskArray,
}: TimelineDragDropProps): JSX.Element => {
	/**
	 * This function processes the drop operation when moving nodes around the tree
	 *
	 * @param result The result of the drop operation
	 */
	const OnDragEnd = (result: DropResult): void => {
		const { source, destination } = result;
		if (!destination) {
			return;
		}
		const NEW_ORDER_SPLICE_INDEX = 1;

		const movedTasks = [...taskArray].map((task: Task) => ({ ...task }));
		const [newOrder] = movedTasks.splice(source.index, NEW_ORDER_SPLICE_INDEX);
		movedTasks.splice(destination.index, SPLICE_OP_NO_DELETE, newOrder);
		setTaskArray(movedTasks);
	};

	return (
		<DragDropContext onDragEnd={OnDragEnd}>
			<Droppable droppableId="vertical-timeline-element--work">
				{(provided): JSX.Element => (
					<div
						className="vertical-timeline-element--work"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{taskArray.map((task, index) => (
							<Draggable draggableId={task.id.toString()} index={index} key={task.id}>
								{(innerProvided): JSX.Element => (
									<span
										ref={innerProvided.innerRef}
										{...innerProvided.draggableProps}
										{...innerProvided.dragHandleProps}
									>
										<VerticalTimelineElement
											className="vertical-timeline-element--work"
											iconStyle={{
												background: `rgb(${task.color + TASK_COLOR_INC},100,150)`,
												color: "#fff",
											}}
										>
											<h3 className="vertical-timeline-element-title">{task.name}</h3>
											<h5>{task.document}</h5>
											<h4>
												{task.points}
												{" Points"}
											</h4>
											<h5>{task.dueDate.toDateString()}</h5>
											<AddRemoveTask
												index={index}
												setTaskArray={(tasks): void => setTaskArray(tasks)}
												taskArray={taskArray}
											/>
											<EditTask
												index={index}
												setTaskArray={(tasks): void => setTaskArray(tasks)}
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
