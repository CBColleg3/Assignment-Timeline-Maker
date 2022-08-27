import React from "react";
import { parseFileTextToXML } from "src/helpers";

/**
 * Interface exposing to the consumer which methods/members are available when using this hook
 */
export type iUseDocument = {
	/**
	 * Clears the document `parsedDocument` from the internal state
	 */
	clearDocument: () => void;
	/**
	 * Parses the file text, and constructs a `Document` from it, which will be parsed again to display the document properly
	 *
	 * @param _fileText - The read file text from the user-selected file
	 */
	parseFileText: (_fileText: string) => void;
	/**
	 * The document resulting from parsing the user-selected file from the list of files in the `FileDisplay` component
	 */
	parsedDocument: Document | undefined;
	/**
	 * Directly mutates the internal `parsedDocument` state, with the passed in document `_document`
	 *
	 * @param _document - The document to replace the internal `parsedDocument` state
	 */
	setParsedDocument: (_document: Document) => void;
};

/**
 * Custom hook that eases the managing of document state, and removing the parsing logic from App.tsx into this custom hook
 *
 * @returns The object with all functions and members to mutate and access the state for the consumer
 */
export const useDocument = (): iUseDocument => {
	const [parsedDocument, setParsedDocument] = React.useState<Document>();

	const parseFileText = React.useCallback((fileText: string) => {
		const parseResult = parseFileTextToXML(fileText);
		setParsedDocument(parseResult);
	}, []);

	const props: iUseDocument = React.useMemo(
		() => ({
			clearDocument: () => setParsedDocument(undefined),
			parseFileText,
			parsedDocument,
			setParsedDocument,
		}),
		[parsedDocument, parseFileText],
	);

	return props;
};
