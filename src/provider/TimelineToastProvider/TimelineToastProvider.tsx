import React, { type ReactNode } from "react";
import type { iTimelineToastContext } from "src/@types/Context";
import type { TimelineToast } from "src/@types/Timeline/TimelineToast/TimelineToast";
import { TimelineToastContext } from "src/context/TimelineToast/TimelineToastContext";
import {
	disappearAnimation,
	disappearAnimationProperties,
	generateTimelineToast,
} from "src/helpers/TimelineToast";

type TimelineToastProviderProperties = {
	children: ReactNode;
};

/**
 * HOC that passes down the task context to any child
 *
 * @param props - The properties of this HOC component
 * @param props.children - The children of this component, aka what this component "wraps"
 * @returns The HOC TimelineToastProvider component
 */
export const TimelineToastProvider = ({ children }: TimelineToastProviderProperties): JSX.Element => {
	const functionalProps: Partial<iTimelineToastContext> = React.useMemo<Partial<iTimelineToastContext>>(
		() => ({
			addToast: (_toast: TimelineToast): void => {
				const timelineToastContainer = document.querySelector("#timeline_toast_container");
				const generatedToastElement = generateTimelineToast(_toast);
				timelineToastContainer?.appendChild(generatedToastElement);
				setTimeout(() => {
					generatedToastElement.animate(disappearAnimation, disappearAnimationProperties);
					timelineToastContainer?.removeChild(generatedToastElement);
				}, _toast.displayTime ?? 3000);
			},
		}),
		[],
	);

	const toastsMemo: iTimelineToastContext = React.useMemo<iTimelineToastContext>(
		() => ({ ...functionalProps } as unknown as iTimelineToastContext),
		[functionalProps],
	);

	return <TimelineToastContext.Provider value={toastsMemo}>{children}</TimelineToastContext.Provider>;
};
