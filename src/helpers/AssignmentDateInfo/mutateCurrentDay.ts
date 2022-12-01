import type { iAssignmentDateInfoContextFormat } from "src/@types";

/**
 * The type of mutation we are executing, either decrement or increment the value
 */
type MutateType = "dec" | "inc";

/**
 * Utility function for mutating the assignment date
 *
 * @param date - The date to mutate
 * @param format - The format to mutate (days, hours, etc)
 * @param mutateType - The type of mutation (increment, decrement)
 */
export const mutateCurrentDay = (
	date: Date,
	format: iAssignmentDateInfoContextFormat,
	mutateType: MutateType,
): void => {
	switch (mutateType) {
		case "inc": {
			switch (format) {
				case "day": {
					date.setDate(date.getDate() + 1);
					break;
				}
				case "hour": {
					date.setHours(date.getHours() + 1);
					break;
				}
				default: {
					break;
				}
			}
			break;
		}
		case "dec": {
			switch (format) {
				case "day": {
					date.setDate(date.getDate() - 1);
					break;
				}
				case "hour": {
					date.setHours(date.getHours() - 1);
					break;
				}
				default: {
					break;
				}
			}
			break;
		}
		default: {
			break;
		}
	}
};
