import React from "react";
import { convertTextChunk } from "src/helpers";

/**
 * Takes an Element containing 'w:p' xml tag information and extracts the text information from it
 *
 * @param {Element} par xml element representing a 'w:p' xml tag
 * @returns {JSX.Element} <p> html tag containing the text information within the 'w:p' tag
 */
export const convertXML2HTML = (par: Element): JSX.Element => {
	const textChunks = Array.from(par.getElementsByTagName("w:r"));

	return <p>{textChunks.map((textChunk: Element): JSX.Element => convertTextChunk(textChunk))}</p>;
};
