import type { AssignmentDate } from "src/@types";

const INDEX_IND = 1;

/**
 * Utility function to organize dates by rank
 *
 * @param dates The array of dates
 * @returns The new array of dates with ranks organized
 */
export const assignDatesRank = (dates: AssignmentDate[]): AssignmentDate[] => {
	let rank = 0;
	let datesContainer: AssignmentDate[] = [];
	for (const eachDate of dates) {
		datesContainer = [...datesContainer, { ...eachDate, rank }];
		rank += INDEX_IND;
	}
	return datesContainer;
};
