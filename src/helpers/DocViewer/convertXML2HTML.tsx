/* eslint-disable @typescript-eslint/no-magic-numbers -- no outstanding magic numbers to report */
import React from "react";
import type { Task } from "src/@types";
import { convertTextChunk, highlightTask, styleContent } from "src/helpers";

/**
 * Takes an Element containing 'w:p' xml tag information and extracts the text information from it
 *
 * @param {Element} par xml element representing a 'w:p' xml tag
 * @param taskArray the array of tasks
 * @returns {JSX.Element} <p> html tag containing the text information within the 'w:p' tag
 */
export const convertXML2HTML = (par: Element, taskArray: Task[]): JSX.Element => {
	const textChunks = Array.from(par.getElementsByTagName("w:r"));
	const globalStyleChunk = Array.from(par.getElementsByTagName("w:pPr"));
	const textArray = Array.from(par.getElementsByTagName("w:t"));

	const textContent = textArray.reduce(
		(content: string, element: Element) => `${content}${element.childNodes[0].nodeValue ?? ""}`,
		"",
	);
	

	const formattedContent = textChunks.map((textChunk: Element): JSX.Element => convertTextChunk(textChunk));

	return (
		<p style={highlightTask(textContent, taskArray)}>{styleContent(formattedContent, globalStyleChunk)}</p>
	);
};
