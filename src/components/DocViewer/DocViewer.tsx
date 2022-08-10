/* eslint-disable @typescript-eslint/no-magic-numbers */
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
		// CONSOLE LOG DOCUMENT: console.log(docXML);
		return (
			<div className="doc-viewer-page">
				<div className="doc-viewer-content">
					{paragraphs.map(
						(par: Element, _parIndex: number): JSX.Element => (
							<span key={`xml-par-${_parIndex}`}>{convertXML2HTML(par)}</span>
						),
					)}
				</div>
			</div>
		);
	}
	return <span />;
};
