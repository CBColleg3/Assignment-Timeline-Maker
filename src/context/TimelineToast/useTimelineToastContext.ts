import React from "react";
import type { iTimelineToastContext } from "src/@types/Context";
import { TimelineToastContext } from "./TimelineToastContext";

/**
 * Uses the TimelineToastContext context (getting it's value), returning the value of the context
 *
 * @returns The TimelineToastContext value. We throw an error if the toast context we are accessing is undefined, meaning that
 * we are accessing the context from an invalid element, because context should only be accessed from elements that are children of the context's provider. Read more
 * about context here: https://reactjs.org/docs/context.html
 */
export const useTimelineToastContext = (): iTimelineToastContext => {
	/**
	 * The context from the created TimelineToastContext, read more https://reactjs.org/docs/hooks-reference.html#usecontext
	 */
	const toastContext: iTimelineToastContext | undefined = React.useContext<
		iTimelineToastContext | undefined
	>(TimelineToastContext);
	if (toastContext !== undefined) {
		return toastContext;
	}

	// Invalid usage, the reason for invalidity described in the documentation of the hook
	throw Error(
		"Invalid usage of useTimelineToastContext (must call it from a component that is a child of TimelineToastContext.Provider)",
	);
};
