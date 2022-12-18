import { colorHex } from "./colorHex";
import { randomInt } from "./randomInt";

/**
 * Constants for the generateRandomColorHex function
 */
const CONSTANTS = {
	/**
	 * The # to decrement the length from to get a valid index
	 */
	LENGTH_DECREMENT: 1,
	/**
	 * The starting index we are including in the lower side of the range
	 */
	STARTING_INDEX: 0,
};

/**
 * Generates a random color from the color map from index 0 --> length - 1, using the constants supplied above.
 * 
 * @returns A random color selected from the color hex
 */
export const generateRandomColorHex = (): string => {
	const values = Object.values(colorHex);
	const randomIndex = randomInt(CONSTANTS.STARTING_INDEX, values.length - CONSTANTS.LENGTH_DECREMENT);
	return Object.values(colorHex)[randomIndex];
};
