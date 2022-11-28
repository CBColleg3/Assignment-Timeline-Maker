/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */

import type { TimelineToast } from "src/@types";
import {
	disappearAnimation,
	disappearAnimationProperties,
	generateTimelineToast,
} from "./generateTimelineToast";
import { generateTimelineToastDeleteButton } from "./generateTimelineToastDeleteButton";

/**
 * Function for handling the addition and deletion of the toast we added
 * 
 * @param _toast - The toast we are adding to the timeline toast container
 */
export const addToast = (_toast: TimelineToast): void => {
	const timelineToastContainer = document.querySelector("#timeline_toast_container");
	const generatedToastElement = generateTimelineToast(_toast);
	const deleteButton = generateTimelineToastDeleteButton();
	generatedToastElement.appendChild(deleteButton);

	if (timelineToastContainer?.childElementCount === 0) {
		timelineToastContainer?.appendChild(generatedToastElement);
	} else {
		timelineToastContainer?.insertBefore(generatedToastElement, timelineToastContainer.children[0]);
	}

	deleteButton.onclick = (): void => {
		if (timelineToastContainer?.contains(generatedToastElement)) {
			generatedToastElement.animate(disappearAnimation, disappearAnimationProperties).finished.then(() => {
				if (timelineToastContainer?.contains(generatedToastElement)) {
					timelineToastContainer?.removeChild(generatedToastElement);
				}
			});
		}
	};

	setTimeout(() => {
		generatedToastElement.animate(disappearAnimation, disappearAnimationProperties).finished.then(() => {
			if (timelineToastContainer?.contains(generatedToastElement)) {
				timelineToastContainer?.removeChild(generatedToastElement);
			}
		});
	}, _toast.displayTime ?? 99999);
};
