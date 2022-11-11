import { parseFileTextToXML } from "src/helpers";

/**
 * Accepts string of document.xml and locates 'w:t' tags containing text and returns string of text contained in document.xml
 *
 * @param fileText - DocumentText used for finding parts
 * @returns All w:t tags concatenated
 */
export const findParts = (fileText: string | undefined): string => {
	const CHILD_NODES_INDEX = 0;
	const xmlDoc = parseFileTextToXML(fileText);
	if (xmlDoc) {
		const textArray = xmlDoc.getElementsByTagName("w:t");
		let total = "";
		for (const eachText of textArray) {
			total += eachText.childNodes[CHILD_NODES_INDEX].nodeValue;
		}
		return total;
	}
	return "";
};
