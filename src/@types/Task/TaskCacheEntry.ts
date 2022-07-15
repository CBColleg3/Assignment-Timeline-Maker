/**
 * An entry in the cache, contains the tasks along with the parsed xml document
 */
export type TaskCacheEntry = {
	tasks: string;
	xml: Document;
};
