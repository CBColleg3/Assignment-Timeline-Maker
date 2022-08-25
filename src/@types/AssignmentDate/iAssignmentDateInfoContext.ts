import type { AssignmentDate } from "./AssignmentDate";
import type { iAssignmentDateInfoContextFormat } from "./iAssignmentDateInfoContextFormat";

/**
 * Context for handling the date state
 */
export type iAssignmentDateInfoContext = {
	/**
	 * Adds a date to the collection
	 *
	 * @param _date - The date to add to the array, gets appended to the end
	 * @returns void
	 */
	addDate: (_date: AssignmentDate) => void;
	/**
	 * Changes the format of the dates
	 *
	 * @param _fmt - The format to change the internal `format` state to
	 * @returns void
	 */
	changeFormat: (_fmt: iAssignmentDateInfoContextFormat) => void;
	/**
	 * Clears all dates from the collection
	 *
	 * @returns void
	 */
	clearDates: () => void;
	/**
	 * The dates that display
	 */
	dates: AssignmentDate[];
	/**
	 * Deletes a date at `_ind`
	 *
	 * @param _ind - The index of the date to remove from the internal state array
	 * @returns void
	 */
	deleteDate: (_ind: number) => void;
	/**
	 * Edits the date specified at `_ind` with the data from `_date`
	 *
	 * @param _date - The data to update the date at `_ind` in the internal `dates` array with
	 * @param _ind - The index of the date to update with the `_date` data
	 * @returns void
	 */
	editDate: (_date: Partial<AssignmentDate>, _ind: number) => void;
	/**
	 * End of the AssignmentDate collection
	 */
	end: AssignmentDate;
	/**
	 * The format to display the dates in
	 */
	format: iAssignmentDateInfoContextFormat;
	/**
	 * Gets the last date in the `dates` internal state array
	 *
	 * @returns The last date in the `dates` internal state array
	 */
	getEnd: () => AssignmentDate;
	/**
	 * Gets the first date in the `dates` internal state array
	 *
	 * @returns The first date in the `dates` internal state array
	 */
	getStart: () => AssignmentDate;
	/**
	 * Inserts a date `_date` at `_ind`
	 *
	 * @param _date - The date to insert
	 * @param _ind - The index upon where to insert the date
	 * @returns void
	 */
	insertDate: (_date: AssignmentDate, _ind: number) => void;
	/**
	 * Checks if the collection is empty
	 */
	isEmpty: () => boolean;
	/**
	 * Moves a date in the internal state array from `_from` to `_to`
	 *
	 * @param _from - The from index
	 * @param _to - The to index
	 * @returns void
	 */
	moveDate: (_from: number, _to: number) => void;
	/**
	 * Sets the end AssignmentDate of the collection to the argument `_date`
	 *
	 * @param _date - The date to override the end
	 */
	setEnd: (_date: AssignmentDate) => void;
	/**
	 * Sets the end's `date` attribute to the passed in date `_date`
	 *
	 * @param _date - The passed in date to override the `end`'s `date` attribute
	 */
	setEndDate: (_date: Date) => void;
	/**
	 * Sets the start AssignmentDate of the collection to the argument `_date`
	 *
	 * @param _date - The passed in AssignmentDate that will override the collection's `start` attribute
	 */
	setStart: (_date: AssignmentDate) => void;
	/**
	 * Sets the start's `date` attribute to the passed in `_date` Date object
	 *
	 * @param _date - The passed in date object that will be overriding the start date's `date` attribute
	 */
	setStartDate: (_date: Date) => void;
	/**
	 * Start of the AssignmentDate collection
	 */
	start: AssignmentDate;
};
