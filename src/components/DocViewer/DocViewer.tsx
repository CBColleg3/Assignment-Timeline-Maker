/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react";
import { useAssignmentDateInfoContext, useFilesContext, useTaskContext } from "src/context";
import { extractParagraphs, convertXML2HTML } from "src/helpers";

/**
 * Renders the document imported, or an empty div if not imported
 *
 * @returns  The uploaded document displayed on the page
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
