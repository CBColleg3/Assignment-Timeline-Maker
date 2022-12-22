import type { HTMLStyle } from "./HTMLStyle";

/**
 * An representation of a parsed XML element
 */
export type XMLStyleElement = {
	/**
	 * The name of element, aka the tag name
	 */
	elemName?: string;
	/**
	 * The attributes of the element, which is converted to HTMLStyle, and since there are most likely multiple attributes, an array of styles.
	 */
	attributes?: HTMLStyle[];
};
