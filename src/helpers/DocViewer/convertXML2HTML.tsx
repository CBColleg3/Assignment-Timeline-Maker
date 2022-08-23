import React from "react";
import type { HTMLStyle, TaskCollection, Task } from "src/@types";
import { translateXMLElementStyling } from "./translateXMLElementStyling";
import { colorHexs } from "src/helpers";

const FIRST_ELEMENT_INDEX = 0;
const EMPTY_ARRAY_LENGTH = 0;
const HIGHLITER_OPACITY = 0.5;
const MIN_OPACITY = 0;
const DEFAULT_OPACITY = 1;
const COLOR_HEX_MAX = 255;
const DIGIT_BASE = 16;
const COLOR_MODIFIER = 100;

/**
 * Takes a single text chunk in a paragraph (w:r tag) and converts it into a span tag with
 * appropriate CSS styling
 *
 * @param {Element} textChunk w:r element obtained from XML
 * @returns {JSX.Element} A span tag with appropriate CSS styling
 */
function convertTextChunk(textChunk: Element): JSX.Element {
	const style: Record<string, string> = getTextStyle(textChunk);
	const highlightStyle: Record<string, string> = getHighlightStyle(textChunk);

	const textArray = Array.from(textChunk.getElementsByTagName("w:t"));

	if (textArray.length === EMPTY_ARRAY_LENGTH) {
		return <span />;
	}

	const output = textArray[FIRST_ELEMENT_INDEX].childNodes[FIRST_ELEMENT_INDEX].nodeValue;

	return (
		<span style={highlightStyle}>
			<span style={style}>{output}</span>
		</span>
	);
}

/**
 * Grabs Word doc highlight styling from XML to be put into a textChunk
 *
 * @param {Element} textChunk w:r element obtained from XML
 * @returns {Record<string, string>} Styling record with textChunk styling information
 */
function getTextStyle(textChunk: Element): Record<string, string> {
	const style: Record<string, string> = {};

	if (textChunk.getElementsByTagName("w:b").length !== EMPTY_ARRAY_LENGTH) {
		style["font-weight"] = "bold";
	}

	if (textChunk.getElementsByTagName("w:i").length !== EMPTY_ARRAY_LENGTH) {
		style["font-style"] = "italic";
	}

	if (textChunk.getElementsByTagName("w:u").length !== EMPTY_ARRAY_LENGTH) {
		style["text-decoration"] = "underline";
	}

	if (textChunk.getElementsByTagName("w:strike").length !== EMPTY_ARRAY_LENGTH) {
		if (style["text-decoration"] !== undefined) {
			style["text-decoration"] += " line-through";
		} else {
			style["text-decoration"] = "line-through";
		}
	}

	if (textChunk.getElementsByTagName("w:color").length !== EMPTY_ARRAY_LENGTH) {
		const color = textChunk.getElementsByTagName("w:color")[FIRST_ELEMENT_INDEX].getAttribute("w:val");
		console.log(color);
		if (color !== null) {
			style.color = `#${color}`;
		}
	}

	return style;
}

/**
 *	Specific function for grabbing Word doc highlight styling from XML to be put into a textChunk
 *
 * @param {Element} textChunk w:r element obtained from XML
 * @returns {Record<string, string>} Styling record with highliting information
 */
function getHighlightStyle(textChunk: Element): Record<string, string> {
	const highlightStyle: Record<string, string> = {};

	if (textChunk.getElementsByTagName("w:highlight").length !== EMPTY_ARRAY_LENGTH) {
		const colorName = textChunk.getElementsByTagName("w:highlight")[FIRST_ELEMENT_INDEX].getAttribute("w:val");

		if (colorName !== null) {
			if (colorHexs[colorName] !== undefined) {
				// Programmtically change opacity to a given highlighter color
				const _opacity = Math.round(
					Math.min(Math.max(HIGHLITER_OPACITY || DEFAULT_OPACITY, MIN_OPACITY), DEFAULT_OPACITY) * COLOR_HEX_MAX,
				);
				highlightStyle.backgroundColor = colorHexs[colorName] + _opacity.toString(DIGIT_BASE).toUpperCase();
			}
		}
	} else if (textChunk.getElementsByTagName("w:shd").length !== EMPTY_ARRAY_LENGTH) {
		// Highlighting takes precedence over standard color fill
		const color = textChunk.getElementsByTagName("w:shd")[FIRST_ELEMENT_INDEX].getAttribute("w:fill");

		if (color !== null) {
			highlightStyle.backgroundColor = `#${color}`;
		}
	}

	return highlightStyle;
}

/**
 *
 * @param globalStyleChunks
 * @returns
 */
function getBackgroundStyle(globalStyleChunks: Element[]): Record<string, string> {
	const backgroundStyle: Record<string, string> = {};

	if (globalStyleChunks.length === EMPTY_ARRAY_LENGTH) {
		return backgroundStyle;
	}

	const parentTag = globalStyleChunks[FIRST_ELEMENT_INDEX].parentElement?.tagName;

	if (parentTag !== undefined) {
		if (globalStyleChunks[FIRST_ELEMENT_INDEX].getElementsByTagName("w:shd").length !== EMPTY_ARRAY_LENGTH) {
			const color =
				globalStyleChunks[FIRST_ELEMENT_INDEX].getElementsByTagName("w:shd")[FIRST_ELEMENT_INDEX].getAttribute(
					"w:fill",
				);

			if (color !== null) {
				backgroundStyle.backgroundColor = `#${color}`;
			}
		}
	}

	return backgroundStyle;
}

/**
 * Takes all converted w:r tags and surrounds them with a final span tag with global w:pPr styling
 *
 * @param {JSX.Element[]} formattedContent List of all span tags converted from w:r XML tags
 * @param {Element[]} globalStyleChunk List of all w:pPr global styling tags
 * @returns {JSX.Element} Span tag with global styling, with span tag children from converted x:r tags
 */
function styleContent(
	formattedContent: JSX.Element[],
	globalStyleChunk: Element[],
): JSX.Element | JSX.Element[] {
	const backgroundStyle: Record<string, string> = getBackgroundStyle(globalStyleChunk);

	if (
		globalStyleChunk.length === EMPTY_ARRAY_LENGTH ||
		globalStyleChunk[FIRST_ELEMENT_INDEX].getElementsByTagName("w:pStyle").length === EMPTY_ARRAY_LENGTH
	) {
		return <span style={backgroundStyle}>{formattedContent}</span>;
	}

	const tag =
		globalStyleChunk[FIRST_ELEMENT_INDEX].getElementsByTagName("w:pStyle")[FIRST_ELEMENT_INDEX].getAttribute(
			"w:val",
		);

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
 * Applies colored highlighting to paragraphs containing the same text found in a generated Task
 *
 * @param {string} textContent textContent of the entire paragraph
 * @param {Task[]} taskArray Array of tasks generated for the timeline
 * @returns {Record<string, string>} Styling record containing task highlighting information
 */
function highlightTask(textContent: string, taskArray: Task[]): Record<string, string> {
	const style: Record<string, string> = {};

	const matchedTask = taskArray.find((task: Task): boolean => task.document.includes(textContent));
	if (matchedTask !== undefined) {
		console.log(`THE COLOR: ${matchedTask.color}`);
		style.backgroundColor = `rgb(${parseInt(matchedTask.color, 16)},100,150)`;
	}

	return style;
}

/**
 * Takes an Element containg 'w:p' xml tag information and extracts the text information from it,
 * including styling
 *
 * @param {Element} par xml element representing a 'w:p' xml tag
 * @returns {JSX.Element} <p> html tag containing the text information within the 'w:p' tag
 */
export function convertXML2HTML(par: Element, taskCollection: TaskCollection | undefined): JSX.Element {
	// Get all text chunks in the paragraph with individual styling (w:r tags)
	const textChunks = Array.from(par.getElementsByTagName("w:r"));

	// Grab styling information that pertains to ALL text within the paragraph (w:pPr tags)
	const globalStyleChunk = Array.from(par.getElementsByTagName("w:pPr"));

	/*
	 * Grab text separately for text-to-Task substring matching for highlighting,
	 * then reduce to one string,
	 */
	const textArray = Array.from(par.getElementsByTagName("w:t"));

	const textContent = textArray.reduce(
		(textContentElement: string, element: Element) =>
			textContentElement +
			(element.childNodes[FIRST_ELEMENT_INDEX].nodeValue !== null
				? element.childNodes[FIRST_ELEMENT_INDEX].nodeValue
				: ""),
		"",
	);

	//
	const formattedContent = textChunks.map((textChunk: Element): JSX.Element => convertTextChunk(textChunk));

	return (
		<p style={highlightTask(textContent, taskCollection !== undefined ? taskCollection.tasks : [])}>
			{styleContent(formattedContent, globalStyleChunk)}
		</p>
	);
}
