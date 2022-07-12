import React from "react";
import { colorHex } from "src/helpers";

/**
 * Utility function parses an XML element into an HTML element
 *
 * @param textChunk XML element that will be parsed for text styles
 * @returns JSX Element of parsed XML element
 */
export const convertTextChunk = (textChunk: Element): JSX.Element => {
	const OUTPUT_INDEX = 0;
	const MIN_TEXT_ARRAY_LENGTH = 0;
	const MIN_TAGNAME_ARRAY_LENGTH = 0;
	const HEX_RADIX = 16;
	const TAGNAME_ARRAY_INDEX = 0;

	let output: string | null = "";
	const style: Record<string, string> = { opacity: "1" };
	const highlightStyle: Record<string, string> = {};
	const backgroundStyle: Record<string, string> = {};

	const textArray = Array.from(textChunk.getElementsByTagName("w:t"));

	if (textArray.length === MIN_TEXT_ARRAY_LENGTH) {
		return <span>{output}</span>;
	}
	output = textArray[OUTPUT_INDEX].childNodes[OUTPUT_INDEX].nodeValue;

	if (textChunk.getElementsByTagName("w:b").length !== MIN_TAGNAME_ARRAY_LENGTH) {
		style["font-weight"] = "bold";
	}

	if (textChunk.getElementsByTagName("w:i").length !== MIN_TAGNAME_ARRAY_LENGTH) {
		style["font-style"] = "italic";
	}

	if (textChunk.getElementsByTagName("w:u").length !== MIN_TAGNAME_ARRAY_LENGTH) {
		style["text-decoration"] = "underline";
	}

	if (textChunk.getElementsByTagName("w:strike").length !== MIN_TAGNAME_ARRAY_LENGTH) {
		if (style["text-decoration"]) {
			style["text-decoration"] += " line-through";
		} else {
			style["text-decoration"] = "line-through";
		}
	}

	if (textChunk.getElementsByTagName("w:color").length !== MIN_TAGNAME_ARRAY_LENGTH) {
		const color = textChunk.getElementsByTagName("w:color")[TAGNAME_ARRAY_INDEX].getAttribute("w:val");
		if (color !== null) {
			style.color = `#${color}`;
		}
	}

	if (textChunk.getElementsByTagName("w:highlight").length !== MIN_TAGNAME_ARRAY_LENGTH) {
		const colorName = textChunk.getElementsByTagName("w:highlight")[TAGNAME_ARRAY_INDEX].getAttribute("w:val");

		if (colorName !== null) {
			if (colorHex[colorName] !== undefined) {
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- provide context on magic numbers used below
				const _opacity = Math.round(Math.min(Math.max(0.5 || 1, 0), 1) * 255);
				highlightStyle["background-color"] = colorHex[colorName] + _opacity.toString(HEX_RADIX).toUpperCase();
			}
		}
	}

	if (textChunk.getElementsByTagName("w:shd").length !== MIN_TAGNAME_ARRAY_LENGTH) {
		const color = textChunk.getElementsByTagName("w:shd")[TAGNAME_ARRAY_INDEX].getAttribute("w:fill");

		if (color !== null) {
			backgroundStyle["background-color"] = `#${color}`;
		}
	}

	return (
		<span style={backgroundStyle}>
			<span style={highlightStyle}>
				<span style={style}>{output}</span>
			</span>
		</span>
	);
};
