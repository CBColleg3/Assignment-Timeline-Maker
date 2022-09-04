import type { AssignmentDate } from "src/@types";

const INCREMENT = 1;
const INDEX_NOT_FOUND = -1;

/**
 * Utility function for generating the index of a selected date in the collection of dates. So for example
 * **If we select 8/20 as our start**, and we have a range from 8/15 --> 8/24, our array will look like:
 * [ 8/15, 8/16, 8/17, 8/18, 8/19, 8/20, 8/21, 8/22 ], then our result should be [ 8/20, 8/21, 8/22 ]
 *
 * @param selectedDate The selected date
 * @param dates The array of current dates
 * @param lowToHigh Whether to go from lowest --> highest or highest --> lowest in terms of finding the index
 * @returns The index of where the date belongs
 */
export const getIndexOfSelectedDateInDates = (
	selectedDate: AssignmentDate,
	dates: AssignmentDate[],
	lowToHigh?: boolean,
): number => {
	let index = 0;
	/**
	 *
	 * @param baseDate The base date which we are passing in (aka the date we are trying to find the index of)
	 * @param compareDate The date we are comparing against the base (the dates we are iterating through, the ones that already exist)
	 * @returns boolean depending on if the user sets lowToHigh to true or false, if true then we are inserting from earliest, to later; if false then we are inserting from latest, to earlier.
	 */
	const compareFunc = (baseDate: Date, compareDate: Date): boolean =>
		lowToHigh ? baseDate.getTime() < compareDate.getTime() : baseDate.getTime() > compareDate.getTime();
	for (const eachDate of dates) {
		const { date } = eachDate;
		if (compareFunc(selectedDate.date, date)) {
			return index - INCREMENT;
		}
		index += INCREMENT;
	}
	return INDEX_NOT_FOUND;
};
