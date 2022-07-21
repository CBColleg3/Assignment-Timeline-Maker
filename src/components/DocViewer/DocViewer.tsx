import React from "react";
import { extractParagraphs, convertXML2HTML } from "src/helpers";

/**
 * Props for the DocViewer component
 */
type DocViewerProps = {
	docXML: Document | undefined;
	fileImported: boolean;
};

/**
 * Renders the document imported, or an empty div if not imported
 *
 * @param {DocViewerProps} props `docXML`: the document, `fileImported`: Whether a file has been imported or not
 * @returns {JSX.Element} DocViewer component
 */
export const DocViewer = ({ docXML, fileImported }: DocViewerProps): JSX.Element => {
	if (fileImported && docXML) {
		const paragraphs = extractParagraphs(docXML);

		return (
			<div className="doc-viewer-page">
				<div className="doc-viewer-content">
					{paragraphs.map((par: Element): JSX.Element => convertXML2HTML(par))}
				</div>
			</div>
		);
	}
	return <span />;
};
