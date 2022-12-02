/* eslint-disable no-mixed-spaces-and-tabs -- disabled prettier/eslint conflict */
/* eslint-disable indent -- disabled prettier/eslint conflict */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useState, useEffect } from "react";
import { Placeholder, Spinner } from "react-bootstrap";
import { useAssignmentDateInfoContext, useFilesContext, useTaskContext } from "src/context";
import { extractParagraphs, convertXML2HTML, getParagraphTextContent, simplifyText } from "src/helpers";
import { ContentSwitch } from "./ContentSwitch";
import styles from "./DocViewer.module.css";

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
 * @returns  The uploaded document displayed on the page
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any -- disabled
			.catch((err: any) => {
				if (err.name === "AbortError") {
					// eslint-disable-next-line no-console -- disabled
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
			{useSimpleContent ? (
				mlContent.simplifiedContent?.length > 0 ? (
					<div className="doc-viewer-content shadow border p-3 mt-2 rounded">
						{mlContent.simplifiedContent !== undefined
							? paragraphs.map(
									(par: Element, _parIndex: number): JSX.Element => (
										<span key={`xml-par-${_parIndex}`}>
											{convertXML2HTML(par, mlContent.currentContent[_parIndex], tasks, start.date)}
										</span>
									),
							  )
							: "Simplified Content is Loading..."}
					</div>
				) : (
					<div
						className={`doc-viewer-content shadow border p-3 mt-2 rounded ${styles.placeholder_doc_viewer}`}
					>
						<Placeholder
							animation="wave"
							as="div"
							bg="dark"
							className="opacity-75 h-100 d-flex flex-column justify-content-center align-items-center"
							size="lg"
						>
							<div className="d-flex flex-column align-items-center">
								<span className="text-light fw-bold fs-5">{"Loading Simplified Content"}</span>
								<Spinner
									animation="border"
									className="mt-2"
									variant="light"
								/>
							</div>
						</Placeholder>
					</div>
				)
			) : (
				<div className="doc-viewer-content shadow border p-3 mt-2 rounded">
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
			)}
		</div>
	);
};
