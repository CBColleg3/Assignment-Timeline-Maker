import type { TimelineToast } from "../Notifications/TimelineToast";

/**
 * Type for the attributes of the TimelineToastContext
 */
export type iTimelineToastContext = {
	/**
	 * Adds a toast to the pending queue
	 *
	 * @param _toast - The toast we are adding to the queue
	 */
	addToast: (_toast: TimelineToast) => void;
};
