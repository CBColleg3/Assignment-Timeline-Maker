/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react";
import { AddRemoveTask } from "src/components/Task/AddRemove/AddRemoveTask";
import "./TimelineDragDrop.css";
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd";
import type { Task } from "src/@types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { TaskInfo } from "src/components/Task/Info/TaskInfo";
import { useTaskContext } from "src/context";
import { isSameDay } from "src/helpers";
import Accordion from "react-bootstrap/Accordion";
import type { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";

type TimelineDragDropProps = {
	currentTaskDate: Date;
	opened: boolean;
};

/**
 * TimelineDragDrop component, which houses the logic for rendering a drag and droppable timeline node component
 *
 * @param {TimelineDragDropProps} props The current task day, which will be used to display specific tasks
 * @returns {JSX.Element} A drag-droppable timeline element
 */
export const TimelineDragDrop = ({ currentTaskDate, opened }: TimelineDragDropProps): JSX.Element => {
	const { tasks, setTasks } = useTaskContext();
	const [currentActiveKey, setCurrentActiveKey] = React.useState<AccordionEventKey>();
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
		setTasks(movedTasks);
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
							<>
								{isSameDay(currentTaskDate, task.dueDate) ? (
									<Draggable
										draggableId={task.id.toString()}
										index={index}
										key={task.id}
									>
										{(prov): JSX.Element => (
											<Accordion
												activeKey={opened ? "0" : currentActiveKey}
												alwaysOpen
												className="show pe-5 ps-3"
												ref={prov.innerRef}
												{...prov.draggableProps}
												{...prov.dragHandleProps}
												onSelect={(ev): void => setCurrentActiveKey(ev)}
											>
												<Accordion.Item eventKey={`${opened ? "0" : index}`}>
													<Accordion.Header>
														<div
															className="pe-2"
															style={{ color: `#${task.color}` }}
														>
															{"\u2B24 "}
														</div>
														{`${task.name}`}
														<span>
															<AddRemoveTask index={index} />
														</span>
													</Accordion.Header>
													<Accordion.Body>
														<div className="d-flex flex-column justify-content-around">
															<span style={{ color: `#${task.color}` }}>
																<TaskInfo
																	index={index}
																	task={task}
																/>
															</span>
														</div>
													</Accordion.Body>
												</Accordion.Item>
											</Accordion>
										)}
									</Draggable>
								) : (
									<span />
								)}
							</>
						))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
