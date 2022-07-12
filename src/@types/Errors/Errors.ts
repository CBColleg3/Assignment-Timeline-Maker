import type { Error } from "./Error";

type ERROR_TYPES = "date" | "file";

type ERROR_OPS = "add" | "delete";

/**
 * Contains all anticipated errors throughout the use of the application
 */
type Errors = {
	date?: Error;
	file?: Error;
};

export type { Errors, ERROR_TYPES, ERROR_OPS };
