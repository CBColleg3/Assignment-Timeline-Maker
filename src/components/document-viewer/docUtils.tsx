import React from "react";

/**
 * Takes a Document file of XML content and extracts paragraph information
 *
 * @param {Document | undefined} docXML Document file containing XML elements of the uploaded DOCX file
 * @returns {Element[]} Array of Elements representing each paragraph in the DOCX
 */
function extractParagraphs(docXML: Document | undefined): Element[] {
	return docXML !== undefined
		? Array.from(docXML.getElementsByTagName("w:p"))
		: [];
}

function convertTextChunk(textChunk: Element): JSX.Element {
	let output;
	const textArray = Array.from(textChunk.getElementsByTagName("w:t"));

	if (textArray.length === 0) {
		return <span>{output}</span>;
	} else {
		output = textArray[0].childNodes[0].nodeValue;
	}

	if (textChunk.getElementsByTagName("w:b").length === 0)
		output = <b>{output}</b>;

	if (textChunk.getElementsByTagName("").length === 0) {
		output;
	}

	return <span>{output}</span>;
}

/**
 * Takes an Element containg 'w:p' xml tag information and extracts the text information from it
 *
 * @param {Element} par xml element representing a 'w:p' xml tag
 * @returns {JSX.Element} <p> html tag containing the text information within the 'w:p' tag
 */
function convertXML2HTML(par: Element): JSX.Element {
	const textChunks = Array.from(par.getElementsByTagName("w:r"));

	return (
		<p>
			{textChunks.map(
				(textChunk: Element): JSX.Element => convertTextChunk(textChunk),
			)}
		</p>
	);
}

export { extractParagraphs, convertXML2HTML };
