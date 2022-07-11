import React from "react";
import type { Task } from "../../templates/task";
import { colorHexs } from "./colorMap";

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

/**
 *
 * @param textChunk
 * @param globalStyleChunk
 * @returns
 */
function convertTextChunk(
	textChunk: Element,
	globalStyleChunk: Element[],
): JSX.Element {
	let output;
	const style: Record<string, string> = getTextStyle(textChunk);
	const highlightStyle: Record<string, string> = getHighlightStyle(textChunk);

	const textArray = Array.from(textChunk.getElementsByTagName("w:t"));

	if (textArray.length === 0) {
		return <span>{output}</span>;
	} else {
		output = textArray[0].childNodes[0].nodeValue;
	}

	return (
		<span style={highlightStyle}>
			<span style={style}>{output}</span>
		</span>
	);
}

/**
 *
 * @param textChunk
 * @returns
 */
function getTextStyle(textChunk: Element): Record<string, string> {
	const style: Record<string, string> = {};

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

	return style;
}

/**
 *
 * @param textChunk
 * @returns
 */
function getHighlightStyle(textChunk: Element): Record<string, string> {
	const highlightStyle: Record<string, string> = {};

	if (textChunk.getElementsByTagName("w:highlight").length !== 0) {
		const colorName = textChunk
			.getElementsByTagName("w:highlight")[0]
			.getAttribute("w:val");

		if (colorName !== null) {
			if (colorHexs[colorName] !== undefined) {
				const _opacity = Math.round(Math.min(Math.max(0.5 || 1, 0), 1) * 255);
				highlightStyle["background-color"] =
					colorHexs[colorName] + _opacity.toString(16).toUpperCase();
			}
		}
	} else if (textChunk.getElementsByTagName("w:shd").length !== 0) {
		// highlighting takes precedence over standard color fill
		const color = textChunk
			.getElementsByTagName("w:shd")[0]
			.getAttribute("w:fill");

		if (color !== null) {
			highlightStyle["background-color"] = "#" + color;
		}
	}

	return highlightStyle;
}

/**
 *
 * @param globalStyleChunks
 * @returns
 */
function getBackgroundStyle(
	globalStyleChunks: Element[],
): Record<string, string> {
	const backgroundStyle: Record<string, string> = {};

	if (globalStyleChunks.length === 0) {
		return backgroundStyle;
	}

	const parentTag = globalStyleChunks[0].parentElement?.tagName;

	if (parentTag !== undefined) {
		if (globalStyleChunks[0].getElementsByTagName("w:shd").length !== 0) {
			const color = globalStyleChunks[0]
				.getElementsByTagName("w:shd")[0]
				.getAttribute("w:fill");

			if (color !== null) {
				backgroundStyle["background-color"] = "#" + color;
			}
		}
	}

	return backgroundStyle;
}

/**
 *
 * @param formattedContent
 * @param globalStyleChunk
 * @returns
 */
function styleContent(
	formattedContent: JSX.Element[],
	globalStyleChunk: Element[],
): JSX.Element | JSX.Element[] {
	const backgroundStyle: Record<string, string> =
		getBackgroundStyle(globalStyleChunk);

	if (
		globalStyleChunk.length === 0 ||
		globalStyleChunk[0].getElementsByTagName("w:pStyle").length === 0
	) {
		return <span style={backgroundStyle}>{formattedContent}</span>;
	}

	const tag = globalStyleChunk[0]
		.getElementsByTagName("w:pStyle")[0]
		.getAttribute("w:val");

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
}

/**
 *
 * @param {string} textContent textContent of the entire paragraph
 * @param {Task[]} taskArray
 * @returns
 */
function highlightTask(
	textContent: string,
	taskArray: Task[],
): Record<string, string> {
	const style: Record<string, string> = {};

	const task = taskArray.find((task: Task): boolean =>
		task.document.includes(textContent),
	);
	if (task !== undefined) {
		console.log("match");
		style["background-color"] = `rgb(${task.color + 100},100,150)`;
	}

	return style;
}

/**
 * Takes an Element containg 'w:p' xml tag information and extracts the text information from it
 *
 * @param {Element} par xml element representing a 'w:p' xml tag
 * @returns {JSX.Element} <p> html tag containing the text information within the 'w:p' tag
 */
function convertXML2HTML(par: Element, taskArray: Task[]): JSX.Element {
	const textChunks = Array.from(par.getElementsByTagName("w:r")); // contains text formatting info
	const globalStyleChunk = Array.from(par.getElementsByTagName("w:pPr")); // contains additional, more specific styling info for text
	const textArray = Array.from(par.getElementsByTagName("w:t"));

	const textContent = textArray.reduce(
		(textContent: string, element: Element) =>
			textContent + element.childNodes[0].nodeValue,
		"",
	);

	const formattedContent = textChunks.map(
		(textChunk: Element): JSX.Element =>
			convertTextChunk(textChunk, globalStyleChunk),
	);

	return (
		<p style={highlightTask(textContent, taskArray)}>
			{styleContent(formattedContent, globalStyleChunk)}
		</p>
	);
}

export { extractParagraphs, convertXML2HTML };
