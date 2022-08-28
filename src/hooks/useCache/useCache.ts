import React from "react";
import type { Task } from "src/@types";

type iUseCache = {
	/**
	 * Clears the internal and external (localStorage) "cache"
	 *
	 * @returns void
	 */
	clearCache: () => void;
	/**
	 * Document cache
	 */
	documentCache: Record<string, Document>;
	/**
	 * Attempts to access the cache entry with key `_key`, returning the existing document associated with that key
	 *
	 * @param _key - The key we are using to attempt to access the value of stored in the cache
	 * @returns The document cache entry value associated with that key
	 */
	getDocument: (_key: string) => Document | undefined;
	/**
	 * Attempts to access tasks cache entry value that is associated with the key `_key`
	 *
	 * @param _key - The key we are using to attempt to access the value of stored in the cache
	 * @returns The tasks cache entry value associated with the passed in key
	 */
	getTasks: (_key: string) => Task[] | undefined;
	/**
	 * Checks if the key `_key` exists in the document cache
	 *
	 * @param _key - The key we are verifying exists in the cache or not
	 */
	isInDocumentCache: (_key: string) => boolean;
	/**
	 * Checks if the key `_key` exists in the file cache
	 *
	 * @param _key - The key we are verifying exists in the cache or not
	 */
	isInFileCache: (_key: string) => boolean;
	/**
	 * Adds a cache entry value for key `_key` with value `_doc` to the document cache
	 *
	 * @param _key - The key to associate the value `_doc` with in the cache
	 * @param _doc - The document to associate with the key `_key` in the cache
	 * @returns void
	 */
	putDocument: (_key: string, _doc: Document) => void;
	/**
	 * Adds a cache entry value for key `_key` with value `_tasks` to the tasks cache
	 *
	 * @param _key - The key to associate the value `_tasks` with in the cache
	 * @param _tasks - The tasks to associate with the key `_key` in the cache
	 * @returns void
	 */
	putTasks: (_key: string, _tasks: Task[]) => void;
};

/**
 * Custom hook exposing methods/members to access the cache, update the cache, and delete the cache
 *
 * @returns The exposed methods/members to the consumer of this hook to mutate/access the cache
 */
export const useCache = (): iUseCache => {
	const documentCache: Record<string, Document> = React.useMemo(() => ({}), []);

	const props = React.useMemo<iUseCache>(
		() => ({
			clearCache: (): void => {
				localStorage.clear();
			},
			documentCache,
			getDocument: (key: string): Document | undefined => {
				if (documentCache) {
					return documentCache[key];
				}
				return undefined;
			},
			getTasks: (key: string): Task[] | undefined => {
				const tasksAsString = localStorage.getItem(key);
				if (tasksAsString) {
					return JSON.parse(tasksAsString) as Task[];
				}
				return undefined;
			},
			isInDocumentCache: (key: string): boolean => {
				if (documentCache) {
					return documentCache[key] !== undefined;
				}
				return false;
			},
			isInFileCache: (key: string) => localStorage.getItem(key) !== null,
			putDocument: (key: string, document: Document): void => {
				documentCache[key] = document;
			},
			putTasks: (key: string, tasks: Task[]) => localStorage.setItem(key, JSON.stringify(tasks)),
		}),
		[documentCache],
	);

	return props;
};
