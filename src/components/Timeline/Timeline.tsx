import React from "react";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import type { AssignmentDate, Task } from "src/@types";
import TimelineDragDrop from "src/components/DragDrop";

/**
 * Props for the Timeline component
 */
type TimelineProps = {
	taskArray: Task[];
	setTaskArray: (taskArray: Task[]) => void;
	fileImported: boolean;
	assignmentDate: AssignmentDate;
};

/**
 * Generates vertical timeline with tasks and calculates days to complete tasks
 *
 * @param {TimelineProps} props The passed in props for the Timeline component
 * @returns {JSX.Element} The Timeline component
 */
export const Timeline = ({
	taskArray,
	setTaskArray,
	fileImported,
	assignmentDate,
}: TimelineProps): JSX.Element => {
	const { start, end } = assignmentDate;
	return (
		<>
			{fileImported && (
				<div>
					<VerticalTimeline layout="2-columns">
						<VerticalTimelineElement
							className="vertical-timeline-element--work"
							contentArrowStyle={{
								borderRight: "7px solid  rgb(160, 16, 82)",
							}}
							contentStyle={{
								background: "rgb(160, 16, 82)",
								color: "#fff",
							}}
							iconStyle={{
								background: "rgb(160, 16, 82)",
								color: "#fff",
							}}
						>
							<h3 className="vertical-timeline-element-title">{"Lets start the Assignment!"}</h3>
							<h4 className="vertical-timeline-element-title">
								{"Due Date: "}
								{end.toLocaleDateString()}{" "}
								{end.toLocaleTimeString(undefined, {
									hour: "2-digit",
									minute: "2-digit",
								})}{" "}
							</h4>
						</VerticalTimelineElement>
						<TimelineDragDrop
							endDate={end}
							setTaskArray={setTaskArray}
							startDate={start}
							taskArray={taskArray}
						/>
						<VerticalTimelineElement
							contentArrowStyle={{
								borderRight: "7px solid  rgb(33, 150, 243)",
							}}
							contentStyle={{
								background: "rgb(33, 150, 243)",
								color: "#fff",
							}}
							iconStyle={{
								background: "rgb(33, 150, 243)",
								color: "#fff",
							}}
						>
							<h3>{"Assignment Completed!"}</h3>
						</VerticalTimelineElement>
					</VerticalTimeline>
				</div>
			)}
		</>
	);
};
