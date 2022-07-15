/* eslint-disable @typescript-eslint/no-magic-numbers -- no outstanding magic numbers to report */

import { colorHex } from "src/helpers";

/**
 * Utility function generating highlight style from textChunk passed in
 *
 * @param textChunk The chunk of elements from the XML document
 * @returns highlight styling to apply to the element
 */
export const getHighlightStyle = (textChunk: Element): Record<string, string> => {
	const highlightStyle: Record<string, string> = {};

	if (textChunk.getElementsByTagName("w:highlight").length !== 0) {
		const colorName = textChunk.getElementsByTagName("w:highlight")[0].getAttribute("w:val");

		if (colorName !== null) {
			if (colorHex[colorName] !== undefined) {
				const _opacity = Math.round(Math.min(Math.max(0.5 || 1, 0), 1) * 255);
				highlightStyle["background-color"] = colorHex[colorName] + _opacity.toString(16).toUpperCase();
			}
		}
	} else if (textChunk.getElementsByTagName("w:shd").length !== 0) {
		// Highlighting takes precedence over standard color fill
		const color = textChunk.getElementsByTagName("w:shd")[0].getAttribute("w:fill");

		if (color !== null) {
			highlightStyle["background-color"] = `#${color}`;
		}
	}

	return highlightStyle;
};
