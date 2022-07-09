import React from "react";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import type { Task } from "../templates/task";
import "react-vertical-timeline-component/style.min.css";
import { TimelineDragDrop } from "./TimelineDragDrop";

/**
 * Props for the Timeline component
 */
type TimelineProps = {
	taskArray: Task[];
	setTaskArray: (taskArray: Task[]) => void;
	fileImported: boolean;
	startDate: Date;
	endDate: Date;
};

/**
 * Generates vertical timeline with tasks and calculates days to complete tasks
 *
 * @param {TimelineProps} props The passed in props for the Timeline component
 * @returns {JSX.Element} The Timeline component
 */
export function Timeline({
	taskArray,
	setTaskArray,
	fileImported,
	startDate,
	endDate,
}: TimelineProps): JSX.Element {
	return (
		<>
			{fileImported && (
				<>
					<div>
						<VerticalTimeline layout="1-column">
							<VerticalTimelineElement
								className="vertical-timeline-element--work"
								contentStyle={{
									background: "rgb(160, 16, 82)",
									color: "#fff",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(160, 16, 82)",
								}}
								iconStyle={{
									background: "rgb(160, 16, 82)",
									color: "#fff",
								}}
							>
								<h3 className="vertical-timeline-element-title">
									Lets start the Assignment!
								</h3>
								<h4 className="vertical-timeline-element-title">
									Due Date: {endDate.toLocaleDateString()}{" "}
									{endDate.toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}{" "}
								</h4>
							</VerticalTimelineElement>
							<TimelineDragDrop
								taskArray={taskArray}
								setTaskArray={setTaskArray}
								startDate={startDate}
								endDate={endDate}
							></TimelineDragDrop>
							<VerticalTimelineElement
								iconStyle={{
									background: "rgb(33, 150, 243)",
									color: "#fff",
								}}
								contentStyle={{
									background: "rgb(33, 150, 243)",
									color: "#fff",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(33, 150, 243)",
								}}
							>
								<h3>Assignment Completed!</h3>
							</VerticalTimelineElement>
						</VerticalTimeline>
					</div>
				</>
			)}
		</>
	);
}
