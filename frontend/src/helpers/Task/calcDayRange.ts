const DAY_IN_MS = 86400000;

/**
 * Utility function for generating the dates between the two dates, inclusive so including both dates supplied initially in the final result.
 *
 * @param date1 - The first date, starting date
 * @param date2 - The last date, ending date
 * @returns An array of dates that are the range from beginning to end
 */
export const calcDayRange = (date1: Date, date2: Date): Date[] => {
	if (!date1 || !date2) {
		return [];
	}
	let startDate = new Date(date1.getTime());
	const endDate = new Date(date2.getTime());
	const dates = [];
	while (startDate.getTime() < endDate.getTime()) {
		dates.push(startDate);
		startDate = new Date(startDate.getTime() + DAY_IN_MS);
	}
	return dates;
};
