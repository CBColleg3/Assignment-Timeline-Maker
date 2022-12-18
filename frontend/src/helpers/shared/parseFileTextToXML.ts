/**
 * Utility function for parsing file text into a xml document
 *
 * @param parsedText - The text of the parsed file
 * @returns The parsed document from the file text
 */
export const parseFileTextToXML = (parsedText: string | undefined): Document => {
	if (parsedText) {
		const parser = new DOMParser();
		const xmlConvertedTextDocument = parser.parseFromString(parsedText, "text/xml");
		return xmlConvertedTextDocument;
	}
	return new Document();
};
