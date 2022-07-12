import { parseFileTextToXML } from "src/helpers";

/**
 * Accepts string of document.xml and locates 'w:t' tags containing text and returns string of text contained in document.xml
 *
 * @param {Promise<any>} fileText DocumentText used for finding parts
 * @returns {Promise<any>} A promise of any type
 */
export const findParts = async (fileText: Promise<string | undefined>): Promise<string> => {
	const CHILD_NODES_INDEX = 0;
	const xmlDoc = await parseFileTextToXML(fileText);
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
