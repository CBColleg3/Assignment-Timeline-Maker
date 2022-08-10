import React from "react";
import type { HTMLStyle } from "src/@types";
import { translateXMLElementStyling } from "./translateXMLElementStyling";

const MIN_PARAGRAPH_CHILD_LENGTH = 1;
const BASE_INDEX = 0;
const FLAT_DIMENSION = 2;
const CONTENT_SLICE_INDEX = 1;
const MIN_ATTRIBUTE_LENGTH = 0;

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
 * @param {Element} par xml element representing a 'w:p' xml tag
 * @returns {JSX.Element} <p> html tag containing the text information within the 'w:p' tag
 */
export const convertXML2HTML = (par: Element): JSX.Element => {
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

	// Setting global CSS with styles extracted from global elements
	globalStyles.forEach((eachStyle) => {
		globalCSS[eachStyle.name] = eachStyle.value;
	});

	return (
		<div style={globalCSS}>
			<span style={contentCSS}>{content}</span>
		</div>
	);
};
