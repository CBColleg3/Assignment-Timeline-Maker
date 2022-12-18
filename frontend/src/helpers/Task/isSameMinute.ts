import { isSameDay } from "./isSameDay";

/**
 * Compares two dates `date1` and `date2` and asserts if they have the same minute, within the same day.
 *
 * @param date1 - The date to compare to date2
 * @param date2 - The date being compared to date1
 * @returns Whether both dates are the same hour within the same day
 */
export const isSameMinute = (date1: Date | undefined, date2: Date | undefined): boolean =>
	date1 !== undefined &&
	date2 !== undefined &&
	isSameDay(date1, date2) &&
	date1.getMinutes() === date2.getMinutes();
