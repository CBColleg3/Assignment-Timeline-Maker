import React from "react";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import type { AssignmentDate } from "src/@types";
import TimelineDragDrop from "src/components/Timeline/DragDrop";

/**
 * Props for the Timeline component
 */
type TimelineProps = {
	assignmentDate: AssignmentDate;
};

/**
 * Generates vertical timeline with tasks and calculates days to complete tasks
 *
 * @param {TimelineProps} props The passed in props for the Timeline component
 * @returns {JSX.Element} The Timeline component
 */
export const Timeline = ({ assignmentDate }: TimelineProps): JSX.Element => (
	<div>
		<VerticalTimeline layout="1-column">
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
					{assignmentDate.end.toLocaleDateString()}{" "}
					{assignmentDate.end.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}{" "}
				</h4>
			</VerticalTimelineElement>
			<TimelineDragDrop />
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
);
