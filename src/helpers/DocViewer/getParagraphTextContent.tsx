/**
 * This function tests if the task field text is within the parsed element text
 *
 * @param paragraphs The task fields we are comparing to the elementText with
 * @returns Whether any text field is within the elementText
 */
export const getParagraphTextContent = (paragraphs: Element[]): string[] => {
	const content = paragraphs.map((par: Element) => [...par.getElementsByTagName("w:t")]
		.map((eachContentElement) => eachContentElement.innerHTML)
		.join("")
		.replaceAll("&gt;", ">")
		.replaceAll("&lt;", "<"));

	return content;
};
