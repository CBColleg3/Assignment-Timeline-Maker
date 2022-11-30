/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useState, useEffect } from "react";
import { useAssignmentDateInfoContext, useFilesContext, useTaskContext } from "src/context";
import { extractParagraphs, convertXML2HTML, getParagraphTextContent, simplifyText } from "src/helpers";
import { ContentSwitch } from "./ContentSwitch";

const FLASK_URL =
	process.env.REACT_APP_FLASK_URL === undefined
		? "http://localhost:5000"
		: process.env.REACT_APP_FLASK_URL;

/**
 * Renders the document imported, or an empty div if not imported
 *
 * @returns {JSX.Element} DocViewer component
 */
export const DocViewer = (): JSX.Element => {
	const { start } = useAssignmentDateInfoContext();
	const { tasks } = useTaskContext();
	const { selectedFileXML } = useFilesContext();
	const paragraphs = extractParagraphs(selectedFileXML);
	const originalContent = getParagraphTextContent(paragraphs);

	const [simpleContent, setSimpleContent] = useState<string[] | undefined>(undefined);
	const [currentContent, setCurrentContent] = useState<string[] | undefined>(originalContent);
	const [useSimpleContent, setUseSimpleContent] = useState<boolean>(false);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		simplifyText(`${FLASK_URL}/api/simplify`, controller, {
			text: originalContent,
		}).then((receivedContent: string[]) => {
			if (isMounted) {
				setSimpleContent(receivedContent);
			}
		})
			.catch(() => {
				if (isMounted) {
					setSimpleContent(undefined);
				}
			});
		return () => {
			controller.abort();
			isMounted = false;
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFileXML]);

	return (
		<div className="doc-viewer-page">
			<ContentSwitch
				originalContent={originalContent}
				setCurrentContent={setCurrentContent}
				setUseSimpleContent={setUseSimpleContent}
				simpleContent={simpleContent}
				useSimpleContent={useSimpleContent}
			/>
			<div className="doc-viewer-content">
				{currentContent !== undefined
					? paragraphs.map(
						(par: Element, _parIndex: number): JSX.Element => (
							<span key={`xml-par-${_parIndex}`}>
								{convertXML2HTML(par, currentContent[_parIndex], tasks, start.date)}
							</span>
						),
					)
					: "Simplified Content is Loading..."}
			</div>
		</div>
	);
};
