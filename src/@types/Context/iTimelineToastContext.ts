import type { TimelineToast } from "../Timeline/TimelineToast/TimelineToast";

/**
 * Type for the attributes of the TimelineToastContext
 */
export type iTimelineToastContext = {
	/**
	 * Adds a toast to the pending queue
	 */
	addToast: (_toast: TimelineToast) => void;
};
