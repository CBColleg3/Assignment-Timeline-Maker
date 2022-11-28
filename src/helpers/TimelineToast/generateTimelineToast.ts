import type { TimelineToast } from "src/@types/Timeline/TimelineToast/TimelineToast";

import styles from "./generateTimelineToastStyles.module.css";

const disappearAnimation: Keyframe[] = [{ opacity: "100%" }, { opacity: "0%" }];

const disappearAnimationProperties: KeyframeAnimationOptions = {
	duration: 1000,
	easing: "ease-in-out",
};

/**
 * Generates a timeline toast notification to display to the user. Appended into the toast notification container.
 *
 * @param toastProperties - The properties of the timeline toast, all fields are not required
 * @returns - The DOM element equivalent of the TimelineToast
 */
const generateTimelineToast = (toastProperties: Partial<TimelineToast>): HTMLDivElement => {
	/**
	 * The template
	 */
	const toastTemplate = document.createElement("div");
	let toastTitle = null;
	let toastSubtitle = null;
	let toastLink = null;
	let toastMessage = null;
	toastTemplate.className = `${styles.toast_layout} ${
		styles[`toast_layout_${toastProperties.variant ?? "info"}`]
	} ${toastProperties.cssOverride ?? ""}`;

	if (toastProperties.title !== undefined) {
		toastTitle = document.createElement("div");
		toastTitle.innerHTML = toastProperties.title;
		toastTitle.className = `${styles.toast_title} ${toastProperties.titleCSSOverride ?? ""}`;
	}

	if (toastProperties.subtitle !== undefined) {
		toastSubtitle = document.createElement("div");
		toastSubtitle.innerHTML = toastProperties.subtitle;
		toastSubtitle.className = `${styles.toast_subtitle} ${toastProperties.subtitleCSSOverride ?? ""}`;
	}

	if (toastProperties.message !== undefined) {
		toastMessage = document.createElement("div");
		toastMessage.innerHTML = toastProperties.message;
		toastMessage.className = `${styles.toast_message} ${toastProperties.messageCSSOverride ?? ""}`;
	}

	if (toastProperties.linkText !== undefined) {
		toastLink = document.createElement("a");
		toastLink.innerHTML = toastProperties.linkText;
		toastLink.href = toastProperties.linkHref ?? "#";
		toastLink.className = `${styles[`toast_link_${toastProperties.variant ?? "info"}`]} ${
			toastProperties.linkCSSOverride ?? ""
		}`;
	}

	if (toastTitle !== null) {
		toastTemplate.appendChild(toastTitle as Element);
	}
	if (toastSubtitle !== null) {
		toastTemplate.appendChild(toastSubtitle as Element);
	}
	if (toastMessage !== null) {
		toastTemplate.appendChild(toastMessage as Element);
	}
	if (toastLink !== null) {
		toastTemplate.appendChild(toastLink as Element);
	}

	return toastTemplate;
};

/**
 * Generates an info toast given the title and the message
 *
 * @param title - The title of the toast
 * @param message - The message to display in the toast
 * @param subtitle - The subtitle of the toast
 * @returns The info toast with the supplied message and title
 */
const generateInfoToast = (
	title: string,
	message: string,
	subtitle?: string,
): Partial<TimelineToast> => ({ message, subtitle, title, variant: "info" });

/**
 * Generates an error toast given the title and the message
 *
 * @param title - The title of the toast
 * @param message - The message to display in the toast
 * @param subtitle - The subtitle of the toast
 * @returns The info toast with the supplied message and title
 */
const generateErrorToast = (
	title: string,
	message: string,
	subtitle?: string,
): Partial<TimelineToast> => ({ message, subtitle, title, variant: "error" });

/**
 * Generates an success toast given the title and the message
 *
 * @param title - The title of the toast
 * @param message - The message to display in the toast
 * @param subtitle - The subtitle of the toast
 * @returns The info toast with the supplied message and title
 */
const generateSuccessToast = (
	title: string,
	message: string,
	subtitle?: string,
): Partial<TimelineToast> => ({ message, subtitle, title, variant: "success" });

export {
	disappearAnimation,
	disappearAnimationProperties,
	generateTimelineToast,
	generateErrorToast,
	generateInfoToast,
	generateSuccessToast,
};
