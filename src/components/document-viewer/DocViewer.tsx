import React from "react";
import "../../App.css";
import { Task } from "../../templates/task";
import { extractParagraphs, convertXML2HTML } from "./docUtils";

/**
 * Props for the DocViewer component
 */
type DocViewerProps = {
	docXML: Document | undefined;
	fileImported: boolean;
	taskArray: Task[];
};

/**
 * Renders the document imported, or an empty div if not imported
 *
 * @param {DocViewerProps} props `docXML`: the document, `fileImported`: Whether a file has been imported or not
 * @returns {JSX.Element} DocViewer component
 */
export function DocViewer({
	docXML,
	fileImported,
	taskArray,
}: DocViewerProps): JSX.Element {
	if (fileImported && docXML !== undefined) {
		// get the paragraphs from the XML content of the uploaded file
		const paragraphs = extractParagraphs(docXML);

		return (
			// map each xml paragraph to html and display it
			<div className="doc-viewer-page">
				<div className="doc-viewer-content">
					{paragraphs.map(
						(par: Element): JSX.Element => convertXML2HTML(par, taskArray),
					)}
				</div>
			</div>
		);
	} else {
		return <div>Import a file to start!</div>;
	}
}
