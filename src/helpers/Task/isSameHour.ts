import { isSameDay } from "./isSameDay";

/**
 * Compares two dates `date1` and `date2` and asserts if they have the same hour, within the same day.
 *
 * @param date1 - The date to compare to date2
 * @param date2 - The date being compared to date1
 * @returns Whether both dates are the same hour within the same day
 */
export const isSameHour = (date1: Date | undefined, date2: Date | undefined): boolean => {
	console.log(date1?.getHours(), date2?.getHours());
	return (
		date1 !== undefined &&
		date2 !== undefined &&
		isSameDay(date1, date2) &&
		date1.getHours() === date2.getHours()
	);
};
