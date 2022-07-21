import type { HTMLStyle } from "src/@types";

const COMMON_DIVISOR = 20;
const FONT_SIZE_DIVISOR = 1.75;

/**
 * Translates XML Element & Attribute to HTML CSS style
 *
 * @param xmlElementName The name of the xml tag, used to determine which styling to apply with the given attribute
 * @param attribute The attribute of the xml element, determines which settings of the style to set (margin has bottom, top, and right, etc)
 * @returns The translated HTML style
 */
export const translateXMLElementStyling = (xmlElementName: string, attribute: HTMLStyle): HTMLStyle => {
	if (xmlElementName) {
		if (xmlElementName === "w:spacing") {
			if (attribute.name === "w:before") {
				return { name: "margin-start", value: `${parseInt(attribute.value, 10) / COMMON_DIVISOR}px` };
			} else if (attribute.name === "w:after") {
				return { name: "margin-end", value: `${parseInt(attribute.value, 10) / COMMON_DIVISOR}px` };
			} else if (attribute.name === "w:line") {
				return { name: "margin-bottom", value: `${parseInt(attribute.value, 10) / COMMON_DIVISOR}px` };
			}
		} else if (xmlElementName === "w:ind") {
			if (attribute.name === "w:right") {
				return { name: "padding-end", value: `${parseInt(attribute.value, 10) / COMMON_DIVISOR}px` };
			} else if (attribute.name === "w:left") {
				return { name: "padding-start", value: `${parseInt(attribute.value, 10) / COMMON_DIVISOR}px` };
			} else if (attribute.name === "w:firstLine" && attribute.value === "1") {
				return { name: "padding-start", value: "20px" };
			}
		} else if (xmlElementName === "w:jc") {
			return { name: "text-align", value: attribute.value };
		} else if (xmlElementName === "w:rFonts") {
			return { name: "font-family", value: attribute.value };
		} else if (xmlElementName === "w:b") {
			return { name: "font-weight", value: "bold" };
		} else if (xmlElementName === "w:color") {
			return {
				name: "color",
				value: attribute.value === "auto" ? attribute.value : `#${attribute.value}`,
			};
		} else if (xmlElementName === "w:position" && attribute.value === "1") {
			return { name: "padding-bottom", value: "20px" };
		} else if (xmlElementName === "w:sz") {
			return { name: "font-size", value: `${parseInt(attribute.value, 10) / FONT_SIZE_DIVISOR}px` };
		} else if (xmlElementName === "w:u") {
			return { name: "text-decoration", value: "underline" };
		} else if (xmlElementName === "w:shd") {
			if (attribute.name === "w:fill") {
				return {
					name: "background-color",
					value: attribute.value === "auto" ? attribute.value : `#${attribute.value}`,
				};
			}
		} else if (xmlElementName === "w:i") {
			return { name: "font-style", value: "italic" };
		} else if (xmlElementName === "w:strike") {
			if (attribute.name === "w:val" && attribute.value === "true") {
				return { name: "text-decoration", value: "line-through" };
			}
		}
	}
	return { name: "", value: "" };
};
