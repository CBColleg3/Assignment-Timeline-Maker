/* eslint-disable no-mixed-spaces-and-tabs -- prettier/eslint config */
/* eslint-disable indent -- prettier/eslint config */
const CONSTANTS = {
	SUBSTR_INC: 1,
	SUBSTR_START: 0,
	THRESHOLD_LENGTH: 25,
};

/**
 * Utility function for truncating text
 *
 * @param text The text to truncate
 * @param threshold The threshold for the text length, if not supplied value is 25
 * @returns The truncated text if the text is greater than the threshold length
 */
export const truncateText = (text: string, threshold = CONSTANTS.THRESHOLD_LENGTH): string =>
	text.length > threshold
		? `${text.charAt(CONSTANTS.SUBSTR_START)}${text.substring(
				CONSTANTS.SUBSTR_START + CONSTANTS.SUBSTR_INC,
				threshold,
		  )}...`
		: text;
