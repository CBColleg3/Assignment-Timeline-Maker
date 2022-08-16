import React from "react";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import type { AssignmentDate, Task } from "src/@types";
import TimelineDragDrop from "src/components/Timeline/DragDrop";
import { TimelineDates } from "./TimelineDates";
import { useTaskContext } from "src/context";

/**
 * Props for the Timeline component
 */
type TimelineProps = {
	assignmentDate: AssignmentDate;
};

const ARRAY_STARTING_INDEX = 0;
const GET_CURRENT_DAY_INDEX = 1;

/**
 * Generates vertical timeline with tasks and calculates days to complete tasks
 *
 * @param {TimelineProps} props The passed in props for the Timeline component
 * @returns {JSX.Element} The Timeline component
 */
export const Timeline = ({ assignmentDate }: TimelineProps): JSX.Element => {
	const { tasks, setTasks } = useTaskContext();
	console.log("Bert Randall Gibbons", tasks);
	const setString = new Set([...tasks].map((task: Task) => new Date(task.dueDate).toLocaleDateString()));

	const dateString = Array.from(setString);
	const [taskDates, setTaskDates] = React.useState<string[]>(dateString);
	const [curTaskDate, setCurTaskDate] = React.useState<string>(dateString[ARRAY_STARTING_INDEX]);

	const startDay = parseInt(assignmentDate.start.toLocaleDateString().split("/")[GET_CURRENT_DAY_INDEX], 10);

	return (
		<div>
			<TimelineDates
				assignmentDate={assignmentDate}
				curTaskDate={curTaskDate}
				setCurTaskDate={setCurTaskDate}
				taskDates={taskDates}
			/>
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
					<h3 className="vertical-timeline-element-title">
						{"Lets start the tasks for Day"}{" "}
						{parseInt(curTaskDate.split("/")[GET_CURRENT_DAY_INDEX], 10) + GET_CURRENT_DAY_INDEX - startDay}
					</h3>
					<h4 className="vertical-timeline-element-title">
						{"Due Date: "}
						{assignmentDate.end.toLocaleDateString()}{" "}
						{assignmentDate.end.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}{" "}
					</h4>
				</VerticalTimelineElement>
				<TimelineDragDrop curTaskDate={curTaskDate} />
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
						{"Day "}{" "}
						{parseInt(curTaskDate.split("/")[GET_CURRENT_DAY_INDEX], 10) + GET_CURRENT_DAY_INDEX - startDay}{" "}
						{" tasks are now complete!!"}
					</h3>
				</VerticalTimelineElement>
			</VerticalTimeline>
		</div>
	);
};
