import React from "react";
import type { HTMLStyle, XMLStyleElement } from "src/@types";
import { translateXMLElementStyling } from "./translateXMLElementStyling";

const MIN_PARAGRAPH_CHILD_LENGTH = 1;
const BASE_INDEX = 0;
const UPPER_CHILD_INDEX = 1;

/**
 * Recursive function to traverse the entire XML element handed to it,
 * and return an array of tags and their associated attributes
 *
 * @param element The child node to traverse, and gather all attributes from
 * @returns All tags in the initially given element, and their associated attributes
 */
const gatherStyleElements = (element: ChildNode): XMLStyleElement[] => {
	if (!element) {
		return [];
	} else if (element.nodeName === "w:t") {
		return [{ attributes: [{ name: "w:text", value: element.textContent ?? "" }], elemName: "w:t" }];
	}
	const children = [...element.childNodes];
	const values: XMLStyleElement[] = [];
	let extraValues: XMLStyleElement[] = [];
	for (const node of children) {
		const nodeName = node.nodeName;
		if (nodeName === "w:rPr") {
			extraValues = gatherStyleElements(node);
			break;
		}
		const foundValue = values.find((eachValue) => eachValue.elemName === nodeName);
		if (!foundValue) {
			const newAttributes: HTMLStyle[] = [];
			const nodeElement = node as Element;
			if (nodeElement.hasAttributes()) {
				const nodeAttributes = [...nodeElement.attributes];
				nodeAttributes.forEach((eachAttribute) => {
					newAttributes.push({ name: eachAttribute.name, value: eachAttribute.nodeValue ?? "" });
				});
				values.push({ attributes: newAttributes, elemName: nodeName });
			}
		} else {
			const nodeElement = node as Element;
			if (nodeElement.hasAttributes()) {
				const nodeAttributes = [...nodeElement.attributes];
				nodeAttributes.forEach((eachAttribute) => {
					if (!foundValue.attributes?.find((eachAttr) => eachAttr.name === eachAttribute.name)) {
						foundValue.attributes?.push({ name: eachAttribute.name, value: eachAttribute.value });
					}
				});
			}
		}
	}
	return [...values, ...extraValues];
};

/**
 * Takes an Element containing 'w:p' xml tag information and extracts the text information from it
 *
 * @param {Element} par xml element representing a 'w:p' xml tag
 * @returns {JSX.Element} <p> html tag containing the text information within the 'w:p' tag
 */
export const convertXML2HTML = (par: Element): JSX.Element => {
	const parChildren = [...par.childNodes];
	if (parChildren.length === MIN_PARAGRAPH_CHILD_LENGTH) {
		// Is a space
		return <p />;
	}
	const globalStyles = gatherStyleElements(parChildren[BASE_INDEX]);

	const contentChildren = [...parChildren[UPPER_CHILD_INDEX].childNodes];
	const contentStyles = gatherStyleElements(contentChildren[BASE_INDEX]);
	const content = par.getElementsByTagName("w:t")[BASE_INDEX]?.innerHTML;

	const globalCSS: { [key: string]: string } = { width: "fit-content" };
	const contentCSS: { [key: string]: string } = { width: "fit-content" };

	for (const eachStyle of globalStyles) {
		if (eachStyle.attributes) {
			for (const eachAttribute of eachStyle.attributes) {
				const translatedStyle = translateXMLElementStyling(eachStyle.elemName ?? "", eachAttribute);
				globalCSS[translatedStyle.name] = translatedStyle.value;
			}
		}
	}

	for (const eachStyle of contentStyles) {
		if (eachStyle.attributes) {
			for (const eachAttribute of eachStyle.attributes) {
				const translatedStyle = translateXMLElementStyling(eachStyle.elemName ?? "", eachAttribute);
				contentCSS[translatedStyle.name] = translatedStyle.value;
			}
		}
	}

	// eslint-disable-next-line no-console -- here for demo purposes
	console.log({ content, contentCSS, contentStyles, globalCSS, globalStyles });

	return (
		<p style={globalCSS}>
			<span style={contentCSS}>{content}</span>
		</p>
	);
};
