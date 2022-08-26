import React from "react";

export type iUseDocument = {
	clearDocument: () => void;
	parsedDocument: Document | undefined;
	setParsedDocument: (_document: Document) => void;
};

/**
 * Custom hook that eases the managing of document state, and removing the parsing logic from App.tsx into this custom hook
 *
 * @returns The object with all functions and members to mutate and access the state for the consumer
 */
export const useDocument = (): iUseDocument => {
	const [parsedDocument, setParsedDocument] = React.useState<Document>();

	const props: iUseDocument = React.useMemo(
		() => ({
			clearDocument: () => setParsedDocument(undefined),
			parsedDocument,
			setParsedDocument,
		}),
		[parsedDocument],
	);

	return props;
};
