import React from "react";

import type { iTimelineToastContext } from "src/@types/Context";

/**
 * The context object, which contains either the TimelineToastContext or undefined. Read more here: https://reactjs.org/docs/context.html
 *
 * We provide the context to all children components using a component called `TimelineToastContext.Provider` and giving it the initial value
 * to provide to all it's children in it's `value` prop. All children of the `TimelineToastContext.Provider` component access/edit the context
 * using the hook `useTimelineToastContext` within it's own internal logic, because it is a child, it has access to the context.
 *
 * TaskContext is a state that consists an object that contains the following keys:
 * - addToast
 *      - Adds a toast to the internal toast collection using a function that consumes an argument `_toast` that is the toast being appended
 * - clearToasts
 *      - Clears all toasts from the internal toast collection
 * - toasts
 *      - The internal queue for notifications (toasts)
 */
export const TimelineToastContext: React.Context<iTimelineToastContext | undefined> =
	React.createContext<iTimelineToastContext | undefined>(undefined);
