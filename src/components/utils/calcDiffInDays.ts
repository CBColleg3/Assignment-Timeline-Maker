/**
 * Milliseconds per day
 */
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * This function calculates the numerical difference between date 1 and date 2
 * 
 * @param {Date} date1 first day, usually the Start Date
 * @param {Date} date2 second day, usually the End Date
 * @returns {number} The difference in days between the two dates, floored.
 */
export function calcDiffInDays(date1: Date, date2: Date): number {
	const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
	return Math.floor((utc2 - utc1) / MS_PER_DAY);
}
