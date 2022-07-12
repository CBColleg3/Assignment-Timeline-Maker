/**
 * Contains all anticipated errors throughout the use of the application
 */
export type Errors = {
	date?: Error;
	file?: Error;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- for unanticipated errors
	misc?: any;
};
