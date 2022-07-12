/* eslint-disable @typescript-eslint/no-magic-numbers -- no outstanding magic numbers used */
import React from "react";
import { getBackgroundStyle } from "src/helpers";

/**
 *
 * @param formattedContent content
 * @param globalStyleChunk text chunk
 * @returns element
 */
export const styleContent = (
	formattedContent: JSX.Element[],
	globalStyleChunk: Element[],
): JSX.Element | JSX.Element[] => {
	const backgroundStyle: Record<string, string> = getBackgroundStyle(globalStyleChunk);

	if (globalStyleChunk.length === 0 || globalStyleChunk[0].getElementsByTagName("w:pStyle").length === 0) {
		return <span style={backgroundStyle}>{formattedContent}</span>;
	}

	const tag = globalStyleChunk[0].getElementsByTagName("w:pStyle")[0].getAttribute("w:val");

	if (tag !== undefined) {
		switch (tag) {
			case "Heading1":
				return <h1 style={backgroundStyle}>{formattedContent}</h1>;
			case "Heading2":
				return <h2 style={backgroundStyle}>{formattedContent}</h2>;
			case "Heading3":
				return <h3 style={backgroundStyle}>{formattedContent}</h3>;
			case "Heading4":
				return <h4 style={backgroundStyle}>{formattedContent}</h4>;
			default:
				return <span style={backgroundStyle}>{formattedContent}</span>;
		}
	} else {
		return <span style={backgroundStyle}>{formattedContent}</span>;
	}
};
