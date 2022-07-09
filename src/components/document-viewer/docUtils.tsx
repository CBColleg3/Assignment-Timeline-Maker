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
	const style: Record<string, string> = {};

	const textArray = Array.from(textChunk.getElementsByTagName("w:t"));

	if (textArray.length === 0) {
		return <span>{output}</span>;
	} else {
		output = textArray[0].childNodes[0].nodeValue;
	}

	if (textChunk.getElementsByTagName("w:b").length !== 0)
		style["font-weight"] = "bold";

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
		const color = textChunk
			.getElementsByTagName("w:color")[0]
			.getAttribute("w:val");
		console.log(color);
		if (color !== null) {
			style["color"] = "#" + color;
		}
	}

	return <span style={style}>{output}</span>;
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
