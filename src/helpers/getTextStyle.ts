/* eslint-disable @typescript-eslint/no-magic-numbers -- no outstanding magic numbers to report*/
/**
 * Utility function to process textChunk and generate text styling from that text chunk
 *
 * @param textChunk Chunk of XML Elements to process styling from
 * @returns The text styling to apply to the elements
 */
export const getTextStyle = (textChunk: Element): Record<string, string> => {
	const style: Record<string, string> = {};

	if (textChunk.getElementsByTagName("w:b").length !== 0) {
		style["font-weight"] = "bold";
	}

	if (textChunk.getElementsByTagName("w:i").length !== 0) {
		style["font-style"] = "italic";
	}

	if (textChunk.getElementsByTagName("w:u").length !== 0) {
		style["text-decoration"] = "underline";
	}

	if (textChunk.getElementsByTagName("w:strike").length !== 0) {
		if (style["text-decoration"] !== undefined) {
			style["text-decoration"] += " line-through";
		} else {
			style["text-decoration"] = "line-through";
		}
	}

	if (textChunk.getElementsByTagName("w:color").length !== 0) {
		const color = textChunk.getElementsByTagName("w:color")[0].getAttribute("w:val");
		if (color !== null) {
			style.color = `#${color}`;
		}
	}

	return style;
};
