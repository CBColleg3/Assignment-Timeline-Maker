/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react";
import { useAssignmentDateInfoContext, useFilesContext, useTaskContext } from "src/context";
import { extractParagraphs, convertXML2HTML } from "src/helpers";

/**
 * Renders the document imported, or an empty div if not imported
 *
 * @param {DocViewerProps} props `docXML`: the document, `fileImported`: Whether a file has been imported or not
 * @returns {JSX.Element} DocViewer component
 */
export const DocViewer = (): JSX.Element => {
	const { start } = useAssignmentDateInfoContext();
	const { tasks } = useTaskContext();
	const { selectedFileXML } = useFilesContext();
	const paragraphs = extractParagraphs(selectedFileXML);

	return (
		<div className="doc-viewer-page">
			<div className="doc-viewer-content">
				{paragraphs.map(
					(par: Element, _parIndex: number): JSX.Element => (
						<span key={`xml-par-${_parIndex}`}>{convertXML2HTML(par, tasks, start.date)}</span>
					),
				)}
			</div>
		</div>
	);
};
