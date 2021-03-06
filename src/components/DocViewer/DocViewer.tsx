import React from "react";
import type { Task } from "src/@types";
import { extractParagraphs, convertXML2HTML } from "src/helpers";

/**
 * Props for the DocViewer component
 */
type DocViewerProps = {
	docXML: Document | undefined;
	fileImported: boolean;
	tasks: Task[];
};

/**
 * Renders the document imported, or an empty div if not imported
 *
 * @param {DocViewerProps} props `docXML`: the document, `fileImported`: Whether a file has been imported or not
 * @returns {JSX.Element} DocViewer component
 */
export const DocViewer = ({ docXML, fileImported, tasks }: DocViewerProps): JSX.Element => {
	if (fileImported && docXML) {
		const paragraphs = extractParagraphs(docXML);

		return (
			<div className="doc-viewer-page">
				<div className="doc-viewer-content">
					{paragraphs.map((par: Element): JSX.Element => convertXML2HTML(par, tasks))}
				</div>
			</div>
		);
	}
	return <div>{"Import a file to start!"}</div>;
};
