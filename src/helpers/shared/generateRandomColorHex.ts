import { colorHex } from "./colorHex";
import { randomInt } from "./randomInt";

const CONSTANTS = {
	LENGTH_DECREMENT: 1,
	STARTING_INDEX: 0,
};

/**
 *
 * @returns A random color selected from the color hex
 */
export const generateRandomColorHex = (): string => {
	const values = Object.values(colorHex);
	return Object.values(colorHex)[
		randomInt(CONSTANTS.STARTING_INDEX, values.length - CONSTANTS.LENGTH_DECREMENT)
	];
};
