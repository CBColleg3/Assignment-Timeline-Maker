import React from "react";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import type { AssignmentDate } from "src/@types";
import TimelineDragDrop from "src/components/Timeline/DragDrop";
import { TimelineDates } from "./Dates/TimelineDates";
import { calcDayRange } from "src/helpers";

/**
 * Props for the Timeline component
 */
type TimelineProps = {
	assignmentDate: AssignmentDate;
	passRef: React.RefObject<HTMLSpanElement>;
};

/**
 * Generates vertical timeline with tasks and calculates days to complete tasks
 *
 * @param {TimelineProps} props The passed in props for the Timeline component
 * @returns {JSX.Element} The Timeline component
 */
export const Timeline = ({ assignmentDate, passRef }: TimelineProps): JSX.Element => {
	const [currentTaskDate, setCurrentTaskDate] = React.useState(assignmentDate.start);
	const [taskDates, setTaskDates] = React.useState<Date[]>([]);

	React.useEffect(() => {
		if (assignmentDate) {
			setTaskDates(calcDayRange(assignmentDate.start, assignmentDate.end));
		}
	}, [assignmentDate]);

	return (
		<div>
			<span ref={passRef}>
				<VerticalTimeline layout="1-column">
					<VerticalTimelineElement
						className="vertical-timeline-element--work rounded-5"
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
						<h3 className="text-center text-decoration-underline">{"Task Table of Contents"}</h3>
						<div className="my-3 fs-6 text-center">
							{`\u2022 Due: ${assignmentDate.end.toLocaleDateString()} ${assignmentDate.end.toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})} \u2022`}
						</div>
						<TimelineDates
							currentTaskDate={currentTaskDate}
							setCurrentTaskDate={(newDate: Date): void => setCurrentTaskDate(newDate)}
							taskDates={taskDates}
						/>
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
						<h3>
							{" "}
							{currentTaskDate.toDateString()} {" tasks are now complete!!"}
						</h3>
					</VerticalTimelineElement>
				</VerticalTimeline>
			</span>
		</div>
	);
};
