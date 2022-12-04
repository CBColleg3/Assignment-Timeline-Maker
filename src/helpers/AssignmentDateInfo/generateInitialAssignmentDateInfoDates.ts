/* eslint-disable @typescript-eslint/no-magic-numbers -- name of file describes the date being manipulated here */
import type { AssignmentDate } from "src/@types";
import { generateRandomColorHex } from "../shared/generateRandomColorHex";

/**
 * Milliseconds in a day
 */
const MS_IN_DAY = 86400000;

/**
 * Utility function for generating the initial assignment date info
 *
 * @returns The initial date for the AssignmentDateInfoProvider component
 */
export const generateInitialAssignmentDateInfoDates = (): AssignmentDate[] =>
	new Array(3)
		.fill(0)
		.map((_, i) => ({ color: generateRandomColorHex(), date: new Date(Date.now() + MS_IN_DAY * i), rank: i }));
