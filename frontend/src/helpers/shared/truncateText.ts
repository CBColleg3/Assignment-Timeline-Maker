/* eslint-disable no-mixed-spaces-and-tabs -- prettier/eslint config */
/* eslint-disable indent -- prettier/eslint config */
const CONSTANTS = {
	/**
	 * Increment the SUBSTR_START by this value to get all characters in front of the first character
	 */
	SUBSTR_INC: 1,
	/**
	 * Where we start our substring, at index 0
	 */
	SUBSTR_START: 0,
	/**
	 * The threshold to where we start truncating if the word goes above 25 characters
	 */
	THRESHOLD_LENGTH: 25,
};

/**
 * Utility function for truncating text, given the `text`, and the `threshold` amount which is the # of characters we limit to not be truncated,
 * and every character that is the ith character above that threshold, is truncated.
 *
 * @param text - The text to truncate
 * @param threshold - The threshold for the text length, if not supplied value is 25
 * @returns The truncated text if the text is greater than the threshold length
 */
export const truncateText = (text: string, threshold = CONSTANTS.THRESHOLD_LENGTH): string =>
	text.length > threshold
		? `${text.charAt(CONSTANTS.SUBSTR_START)}${text.substring(
				CONSTANTS.SUBSTR_START + CONSTANTS.SUBSTR_INC,
				threshold,
		  )}...`
		: text;
