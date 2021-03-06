/**
 * Utility function for parsing file text into a xml document
 *
 * @param fileText The text of the parsed file
 */
export const parseFileTextToXML = async (fileText: Promise<string | undefined>): Promise<Document> => {
	const parsedText = await fileText;
	if (parsedText) {
		const parser = new DOMParser();
		const xmlConvertedTextDocument = parser.parseFromString(parsedText, "text/xml");
		return xmlConvertedTextDocument;
	}
	return new Document();
};
