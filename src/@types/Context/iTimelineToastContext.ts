import type { TimelineToast } from "../Notifications/TimelineToast";

/**
 * Type for the attributes of the TimelineToastContext
 */
export type iTimelineToastContext = {
	/**
	 * Adds a toast to the pending queue
	 */
	addToast: (_toast: TimelineToast) => void;
};
