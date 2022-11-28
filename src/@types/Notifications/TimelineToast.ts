type TimelineToastVariant = "error" | "info" | "success";

/**
 * Type for a timeline toast instance
 */
type TimelineToast = {
	/**
	 * Override of the toast element itself (root of the dom tree in reference to the toast element)
	 */
	cssOverride?: string;
	/**
	 * The amount of time in ms that the toast is displayed for
	 */
	displayTime?: number;
	/**
	 * The link of the toast
	 */
	linkText?: string;
	/**
	 * The href for the link
	 */
	linkHref?: string;
	/**
	 * Override option for users who want to customize the link style
	 */
	linkCSSOverride?: string;
	/**
	 * The message of the toast
	 */
	message?: HTMLElement | string;
	/**
	 * Override option for users who want to  customize the message style
	 */
	messageCSSOverride?: string;
	/**
	 * The color theme of the toast
	 */
	variant?: TimelineToastVariant;
	/**
	 * The subtitle of the toast
	 */
	subtitle?: string;
	/**
	 * Override option for users who want to customize the subtitle style
	 */
	subtitleCSSOverride?: string;
	/**
	 * The title of the toast
	 */
	title?: string;
	/**
	 * Override option for users who want to customize the title style
	 */
	titleCSSOverride?: string;
};

export type { TimelineToastVariant, TimelineToast };
