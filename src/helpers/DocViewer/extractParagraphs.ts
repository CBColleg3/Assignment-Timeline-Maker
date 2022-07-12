/**
 * Takes a Document file of XML content and extracts paragraph information
 *
 * @param {Document | undefined} docXML Document file containing XML elements of the uploaded DOCX file
 * @returns {Element[]} Array of Elements representing each paragraph in the DOCX
 */
export const extractParagraphs = (docXML: Document | undefined): Element[] =>
	docXML ? Array.from(docXML.getElementsByTagName("w:p")) : [];
