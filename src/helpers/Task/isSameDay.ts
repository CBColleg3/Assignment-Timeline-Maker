/**
 * Helper function for determining whether two dates are the same day
 *
 * @param date1 The first date
 * @param date2 The second date
 * @returns Whether the two dates fall on the same day
 */
export const isSameDay = (date1: Date | undefined, date2: Date | undefined): boolean => {
	if (!date1 || !date2) {
		return false;
	}
	console.log("date1 hours: ", date1.getHours());
	console.log("date2 hours: ", date2.getHours());
	return (
		date1?.getHours() === date2?.getHours() &&
		date1?.getDate() === date2?.getDate() &&
		date1?.getMonth() === date2?.getMonth() &&
		date1?.getFullYear() === date2?.getFullYear()
	);
};
