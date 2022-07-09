import React from "react";

/**
 * Takes a Document file of XML content and extracts paragraph information
 * 
 * @param {Document | undefined} docXML Document file containing XML elements of the uploaded DOCX file
 * @returns {Element[]} Array of Elements representing each paragraph in the DOCX
 */
function extractParagraphs(docXML: Document | undefined): Element[] {
	return docXML ? Array.from(docXML.getElementsByTagName("w:p")) : [];
}

/**
 * Takes an Element containing 'w:p' xml tag information and extracts the text information from it
 *
 * @param {Element} par xml element representing a 'w:p' xml tag
 * @returns {JSX.Element} <p> html tag containing the text information within the 'w:p' tag
 */
function convertXML2HTML(par: Element): JSX.Element {
	const textArray = Array.from(par.getElementsByTagName("w:t"));
	const CHILD_NODE_INDEX = 0;

	const textContent = textArray.reduce(
		(content: string, element: Element) =>
			`${content}${element.childNodes[CHILD_NODE_INDEX].nodeValue}`,
		"",
	);

	return <p>{textContent}</p>;
}

export { extractParagraphs, convertXML2HTML };
