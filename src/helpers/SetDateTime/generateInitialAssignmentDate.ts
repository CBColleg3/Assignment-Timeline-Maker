import type { AssignmentDateRange } from "src/@types";
import { END_DAY_INIT_INCREMENT } from "src/components/Date/SetDateTime";
import { generateAssignmentDatesFromStartEnd } from "./generateAssignmentDatesFromStartEnd";
import { generateRandomDate } from "./generateRandomDate";

const CONSTANTS = {
	INIT_END_RANK: 1,
	INIT_START_RANK: 0,
};

/**
 * Utility function for generating the initial assignment date
 *
 * @returns The initial assignment date upon application render
 */
export const generateInitialAssignmentDate = (): AssignmentDateRange => {
	const start = generateRandomDate(CONSTANTS.INIT_START_RANK, new Date(Date.now()));
	const end = generateRandomDate(CONSTANTS.INIT_END_RANK, new Date(Date.now() + END_DAY_INIT_INCREMENT));
	const dates = generateAssignmentDatesFromStartEnd(start, end);
	return {
		dates,
		end,
		start,
	};
};
