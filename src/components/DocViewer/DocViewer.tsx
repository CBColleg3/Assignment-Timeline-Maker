/* eslint-disable no-mixed-spaces-and-tabs -- disabled prettier/eslint conflict */
/* eslint-disable indent -- disabled prettier/eslint conflict */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useState, useEffect } from "react";
import { useAssignmentDateInfoContext, useFilesContext, useTaskContext } from "src/context";
import { extractParagraphs, convertXML2HTML, getParagraphTextContent, simplifyText } from "src/helpers";
import { ContentSwitch } from "./ContentSwitch";

type MLContent = {
	currentContent: string[];
	simplifiedContent: string[];
	originalContent: string[];
};

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

	const [mlContent, setMlContent] = React.useState<MLContent>(() => {
		const origContent = getParagraphTextContent(extractParagraphs(selectedFileXML));
		return {
			currentContent: origContent,
			originalContent: origContent,
			simplifiedContent: [],
		};
	});

	const [useSimpleContent, setUseSimpleContent] = useState<boolean>(false);

	useEffect(() => {
		const controller = new AbortController();
		simplifyText(`${FLASK_URL}/api/simplify`, controller, {
			text: mlContent.originalContent,
		})
			.then((receivedContent: string[]) => {
				setMlContent((oldMlContent: MLContent) => ({ ...oldMlContent, simplifiedContent: receivedContent }));
			})
			.catch((err) => {
				if (err.name === "AbortError") {
					console.log("abort error");
				}
			});
		return () => {
			controller.abort();
		};
	}, [mlContent.originalContent]);

	return (
		<div className="doc-viewer-page">
			<ContentSwitch
				setUseSimpleContent={(newValue: boolean): void => setUseSimpleContent(newValue)}
				useSimpleContent={useSimpleContent}
			/>
			<div className="doc-viewer-content">
				{mlContent.currentContent !== undefined
					? paragraphs.map(
							(par: Element, _parIndex: number): JSX.Element => (
								<span key={`xml-par-${_parIndex}`}>
									{convertXML2HTML(par, mlContent.currentContent[_parIndex], tasks, start.date)}
								</span>
							),
					  )
					: "Simplified Content is Loading..."}
			</div>
		</div>
	);
};
