import React from "react";
import "react-vertical-timeline-component/style.min.css";
import { TimelineDragDrop, TimelineDates } from "src/components";
import { calcDayRange, calcHourRange } from "src/helpers";
import { useAssignmentDateInfoContext } from "src/context";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

/**
 * Props for the Timeline component
 */
type TimelineProps = {
	/**
	 * Ref passed in from the parent to wrap around the entire timeline
	 */
	passRef: React.RefObject<HTMLSpanElement>;
};

/**
 * Generates vertical timeline with tasks and calculates days to complete tasks
 *
 * @param props The passed in props for the Timeline component
 * @param props.passRef - The ref object that holds the reference to the entire timeline component
 * @returns {JSX.Element} The Timeline component
 */
export const Timeline = ({ passRef }: TimelineProps): JSX.Element => {
	const { end, format, start } = useAssignmentDateInfoContext();
	const [currentTaskDate, setCurrentTaskDate] = React.useState(start.date);
	const [taskDates, setTaskDates] = React.useState<Date[]>([]);

	React.useEffect(() => {
		if (start && end) {
			if (format === "day") {
				setTaskDates(calcDayRange(start.date, end.date));
			} else {
				setTaskDates(calcHourRange(start.date, end.date));
			}
		}
	}, [end, start, format]);

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
							{`\u2022 Due: ${end.date.toLocaleDateString()} ${end.date.toLocaleTimeString([], {
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
						{currentTaskDate.toDateString()} {" tasks are now complete!!"}
					</VerticalTimelineElement>
				</VerticalTimeline>
			</span>
		</div>
	);
};
