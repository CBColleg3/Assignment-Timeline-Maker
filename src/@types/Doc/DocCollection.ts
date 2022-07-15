/**
 * Represents a stored parsed xml document, migrated to DocCollection type to aid with cache implementation
 */
export type DocCollection = {
	id: string;
	doc: Document;
};
