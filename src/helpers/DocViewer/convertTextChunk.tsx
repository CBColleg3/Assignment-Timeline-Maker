/* eslint-disable @typescript-eslint/no-magic-numbers -- no outstanding magic numbers to report */
import React from "react";
import { getTextStyle, getHighlightStyle } from "src/helpers";

/**
 *
 * @param textChunk HTML chunk used to generate highlight styling and text styling from
 * @returns The converted text chunk with applied styling, in JSX.Element format
 */
export const convertTextChunk = (textChunk: Element): JSX.Element => {
	let output: string | null = "";
	const style: Record<string, string> = getTextStyle(textChunk);
	const highlightStyle: Record<string, string> = getHighlightStyle(textChunk);

	const textArray = Array.from(textChunk.getElementsByTagName("w:t"));

	if (textArray.length === 0) {
		return <span>{output}</span>;
	}
	output = textArray[0].childNodes[0].nodeValue;

	return (
		<span style={highlightStyle}>
			<span style={style}>{output ?? ""}</span>
		</span>
	);
};
