import React from "react";
import "react-vertical-timeline-component/style.min.css";
import type { AssignmentDate } from "src/@types";
import TimelineDragDrop from "src/components/Timeline/DragDrop";
import { TimelineDates } from "./Dates/TimelineDates";
import { calcDayRange } from "src/helpers";
import { Button } from "react-bootstrap";
import styles from "./Timeline.module.css";

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
	const [openAll, setOpenAll] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (assignmentDate) {
			setTaskDates(calcDayRange(assignmentDate.start, assignmentDate.end));
		}
	}, [assignmentDate]);

	return (
		<div>
			<div className="d-flex flex-row justify-content-around">
				<TimelineDates
					setCurrentTaskDate={(newDate: Date): void => setCurrentTaskDate(newDate)}
					taskDates={taskDates}
				/>
				<Button
					className="h-50 my-auto"
					onClick={(): void => setOpenAll((oldValue) => !oldValue)}
					variant={openAll ? "outline-danger" : "outline-success"}
				>
					{openAll ? "Close All Tasks" : "Open All Tasks"}
				</Button>
			</div>
			<span ref={passRef}>
				<div>
					<div
						className={`d-flex flex-row justify-content-around bg-danger rounded-3 p-4 text-light opacity-75 w-75 mx-auto mb-3 ${styles.start_end_container} ${styles.start_end_text} align-items-center`}
						style={{ fontWeight: "bold" }}
					>
						{"Lets start the tasks for "} {currentTaskDate.toDateString()} {"\n"}
						{"Due Date: "} {assignmentDate.end.toLocaleDateString()}{" "}
						{assignmentDate.end.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}{" "}
					</div>
					<TimelineDragDrop
						currentTaskDate={currentTaskDate}
						opened={openAll}
					/>
					<div
						className={`d-flex flex-row justify-content-around bg-primary rounded-3 p-4 text-light opacity-75 w-75 mx-auto mt-3 ${styles.start_end_container} ${styles.start_end_text} align-items-center`}
						style={{ fontWeight: "bold" }}
					>
						{currentTaskDate.toDateString()} {" tasks are now complete!!"}
					</div>
				</div>
			</span>
		</div>
	);
};
