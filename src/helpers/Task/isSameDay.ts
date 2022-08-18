/**
 * Helper function for determining whether two dates are the same day
 *
 * @param date1 The first date
 * @param date2 The second date
 * @returns Whether the two dates fall on the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
	if (!date1 || !date2) {
		return false;
	}
	return (
		date1?.getDay() === date2?.getDay() &&
		date1?.getMonth() === date2?.getMonth() &&
		date1?.getFullYear() === date2?.getFullYear()
	);
};
