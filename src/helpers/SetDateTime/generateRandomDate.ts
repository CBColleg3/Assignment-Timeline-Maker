import type { AssignmentDate } from "src/@types";
import { generateRandomColorHex } from "../shared/generateRandomColorHex";

/**
 * Utility function for generating a random date, used mostly in instantiation of application
 *
 * @param rank The rank of the assignment date
 * @param date The date of the assignment date
 * @returns The generated random date
 */
export const generateRandomDate = (rank: number, date: Date): AssignmentDate => ({
	color: generateRandomColorHex(),
	date,
	rank,
});
