import type {
	TimelineToast,
	TimelineToastVariant,
} from "src/@types/Timeline/TimelineToast/TimelineToast";

import styles from "./generateTimelineToastStyles.module.css";

const disappearAnimation: Keyframe[] = [{ opacity: "100%" }, { opacity: "0%" }];

const disappearAnimationProperties: KeyframeAnimationOptions = {
	duration: 1000,
	easing: "ease-in-out",
};

/**
 *
 * @param toastProperties
 */
const generateTimelineToast = (toastProperties: Partial<TimelineToast>): HTMLDivElement => {
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

	toastTemplate.appendChild(toastTitle as Element);
	toastTemplate.appendChild(toastSubtitle as Element);
	toastTemplate.appendChild(toastMessage as Element);
	toastTemplate.appendChild(toastLink as Element);
	return toastTemplate;
};

export { disappearAnimation, disappearAnimationProperties, generateTimelineToast };
