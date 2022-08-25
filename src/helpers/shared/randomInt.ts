const CONSTANTS = {
	NULL_DEFAULT: 0,
};

/**
 * Generates a random int between min and max
 *
 * @param min The minimum value
 * @param max The maximum value
 * @returns A random int between min and max
 */
export const randomInt = (min?: number, max?: number): number => {
	const minValue = min ?? CONSTANTS.NULL_DEFAULT;
	const maxValue = max ?? CONSTANTS.NULL_DEFAULT;
	return Math.random() * (maxValue - minValue) + minValue;
};
