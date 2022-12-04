/**
 * The parsed XML attribute, converted to HTML equivalent
 */
export type HTMLStyle = {
	/**
	 * The name of the attribute (min-width, background-color, font-size, etc.)
	 */
	name: string;
	/**
	 * The value of the attribute (10%, 20vh, calc(20vw), etc.)
	 */
	value: string;
};
