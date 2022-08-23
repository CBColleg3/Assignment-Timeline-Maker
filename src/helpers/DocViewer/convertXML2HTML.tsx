import React from "react";
import type { HTMLStyle, Task } from "src/@types";
import { isTaskInElement } from "./isTaskInElement";
import { translateXMLElementStyling } from "./translateXMLElementStyling";

const MIN_PARAGRAPH_CHILD_LENGTH = 1;
const BASE_INDEX = 0;
const FLAT_DIMENSION = 2;
const CONTENT_SLICE_INDEX = 1;
const MIN_ATTRIBUTE_LENGTH = 0;
const LIST_ELEMENT_DOES_NOT_EXIST = -1;
const HIGHLIGHT_STYLES = ["backgroundColor", "color"];
const BORDER_STYLE = "border";
const BORDER_RADIUS = "borderRadius";

/**
 * Generates a border style for the component
 *
 * @param color The color to generate the border for
 * @returns The generated border style
 */
const generateBorderStyle = (color: string): string => `solid #${color}`;

/**
 * Utility function for determining whether an element is a space
 *
 * @param childrenAmount The amount of children in the node
 * @returns Whether the children amount designates a space
 */
const isSpace = (childrenAmount: number): boolean => childrenAmount === MIN_PARAGRAPH_CHILD_LENGTH;

/**
 * Traverses an xml element recursively and returns all elements
 *
 * @param element The current element we are traversing through
 * @param elements The stack of elements initialized at the root level
 * @returns All the elements within the element
 */
const traverseXmlTree = (element: Element, elements: Element[] = []): Element[] => {
	if (!element) {
		return elements;
	}
	const rootElements = [
		...elements,
		element,
		...[...element.children].map((eachChild) => traverseXmlTree(eachChild, elements)).flat(FLAT_DIMENSION),
	];
	return [...rootElements];
};

/**
 * Utility function for generating an html style from a node attribute
 *
 * @param attribute The attribute to convert to HTML style
 * @returns The HTML stylized attribute
 */
const convertAttributeToHtmlStyle = (attribute: Attr): HTMLStyle => {
	const { name, value } = attribute;
	return { name, value };
};

/**
 * Takes an Element containing 'w:p' xml tag information and extracts the text information from it
 *
 * @param par xml element representing a 'w:p' xml tag
 * @param tasks The tasks we want to compare the parsed text to, to apply highlighting upon matching
 * @returns <p> html tag containing the text information within the 'w:p' tag
 */
export const convertXML2HTML = (par: Element, tasks: Task[] = []): JSX.Element => {
	const htmlElement = par as HTMLElement;
	const parChildren = [...htmlElement.children];
	if (isSpace(parChildren.length)) {
		return <p />;
	}

	// Initialize css object
	const globalCSS: { [key: string]: string } = {};
	const contentCSS: { [key: string]: string } = {};

	// Gather nested elements from xml element
	const globalElements = traverseXmlTree(parChildren[BASE_INDEX]);
	const contentElements = parChildren
		.slice(CONTENT_SLICE_INDEX)
		.map((eachElement) => traverseXmlTree(eachElement))
		.flat(FLAT_DIMENSION);

	// Get text content from node
	const content = [...par.getElementsByTagName("w:t")]
		.map((eachContentElement) => eachContentElement.innerHTML)
		.join("")
		.replaceAll("&gt;", ">")
		.replaceAll("&lt;", "<");

	if (content === "") {
		return <p />;
	}

	// Gather all css styling from all global elements
	const globalStyles = globalElements
		.map((eachElement) =>
			[...eachElement.attributes].map((eachAttribute) =>
				translateXMLElementStyling(eachElement.tagName, convertAttributeToHtmlStyle(eachAttribute)),
			),
		)
		.flat(FLAT_DIMENSION)
		.filter((elem) => elem.value !== "");

	// Gather all css styling from all content elements
	const contentStyles = contentElements
		.map((eachElement) => {
			if (eachElement.attributes.length > MIN_ATTRIBUTE_LENGTH) {
				return [...eachElement.attributes].map((eachAttribute) =>
					translateXMLElementStyling(eachElement.tagName, convertAttributeToHtmlStyle(eachAttribute)),
				);
			}
			return translateXMLElementStyling(eachElement.tagName, { name: "", value: "" });
		})
		.flat(FLAT_DIMENSION)
		.filter((elem) => elem.value !== "");

	// Setting content CSS with styles extracted from content elements
	contentStyles.forEach((eachStyle) => {
		contentCSS[eachStyle.name] = eachStyle.value;
	});

	const containedTask = tasks.filter((eachTask) =>
		isTaskInElement([eachTask.document, eachTask.name], content),
	);

	// Setting global CSS with styles extracted from global elements
	globalStyles.forEach((eachStyle) => {
		if (HIGHLIGHT_STYLES.includes(eachStyle.name) && containedTask.length) {
			const [task] = containedTask;
			globalCSS[BORDER_STYLE] = generateBorderStyle(task.color);
			globalCSS[BORDER_RADIUS] = "10px";
		} else {
			globalCSS[eachStyle.name] = eachStyle.value;
		}
	});

	const isListElementPresent = globalElements.findIndex((eachElement) =>
		eachElement.tagName.includes("w:numPr"),
	);

	return (
		<div style={globalCSS}>
			<span>
				{isListElementPresent !== LIST_ELEMENT_DOES_NOT_EXIST ? (
					<ul>
						<li>
							<span style={contentCSS}>{content}</span>
						</li>
					</ul>
				) : (
					<span style={contentCSS}>{content}</span>
				)}
			</span>
		</div>
	);
};
