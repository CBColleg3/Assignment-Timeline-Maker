import React from "react";

/**
 * Takes a Document file of XML content and extracts paragraph information
 * @param docXML Document file containing XML elements of the uploaded DOCX file
 * @returns Array of Elements representing each paragraph in the DOCX
 */
function extractParagraphs(docXML: Document | undefined): Element[] {
  
	return docXML !== undefined
		? Array.from(docXML.getElementsByTagName("w:p"))
		: [];
}

/**
 * Takes an Element containg 'w:p' xml tag information and extracts the text information from it
 * @param par xml element representing a 'w:p' xml tag
 * @returns <p> html tag containing the text information within the 'w:p' tag
 */
function convertXML2HTML(par: Element): JSX.Element {
	const textArray = Array.from(par.getElementsByTagName("w:t"));

	const textContent = textArray.reduce(
		(textContent: string, element: Element) =>
			textContent + element.childNodes[0].nodeValue,
		"",
	);

	return <p>{textContent}</p>;
}

export { extractParagraphs, convertXML2HTML };
