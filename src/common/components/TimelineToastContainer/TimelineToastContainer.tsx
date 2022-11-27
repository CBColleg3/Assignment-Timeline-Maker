import React, { type ReactNode } from "react";
import { TimelineToast } from "src/@types/Timeline/TimelineToast/TimelineToast";
import { useTimelineToastContext } from "src/context";

import styles from "./TimelineToastContainer.module.css";

type TimelineToastContainerProperties = {
	orientation?: "bottomend" | "bottomstart" | "end" | "start" | "top" | "topend" | "topstart";
};

/**
 * Container to display all the toasts on the queue
 *
 * @param props - The properties of the TimelineToastContainer
 * @param children - The array of toast objects in the queue
 * @returns The toast container
 */
export const TimelineToastContainer = ({
	orientation = "bottomend",
}: TimelineToastContainerProperties): JSX.Element => (
	<div
		className={`${styles.timeline_toast_container} ${styles[`timeline_toast_container_${orientation}`]}`}
		id="timeline_toast_container"
	/>
);
