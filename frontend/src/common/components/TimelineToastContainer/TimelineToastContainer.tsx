import React from "react";

import styles from "./TimelineToastContainer.module.css";

/**
 * The orientation the user can set on the TimelineToast container, specifying it's position on the page
 */
type TimelineToastContainerOrientation =
	| "bottom_leftright"
	| "bottom_rightleft"
	| "bottom"
	| "left_downtop"
	| "left_topdown"
	| "left"
	| "right_downtop"
	| "right_topdown"
	| "right"
	| "top_leftright"
	| "top_rightleft"
	| "top";

/**
 * The properties of the TimelineToast container component
 */
type TimelineToastContainerProperties = {
	/**
	 * The orientation of the TimelineToast container
	 */
	orientation?: TimelineToastContainerOrientation;
};

/**
 * Container to display all the toasts on the queue
 *
 * @param props - The properties of the TimelineToastContainer
 * @param props.orientation - The placement of the toast container itself
 * @returns The toast container
 */
const TimelineToastContainer = ({
	orientation = "right",
}: TimelineToastContainerProperties): JSX.Element => (
	<div
		className={`${styles.timeline_toast_container} ${styles[`timeline_toast_container_${orientation}`]}`}
		data-orientation={orientation}
		id="timeline_toast_container"
	/>
);

export { type TimelineToastContainerOrientation, TimelineToastContainer };
