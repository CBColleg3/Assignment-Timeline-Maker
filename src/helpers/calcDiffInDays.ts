/**
 * Milliseconds per second
 */
const MS_PER_SECOND = 1000;

/**
 * Seconds per minute
 */
const SECONDS_PER_MINUTES = 60;

/**
 * Minutes per hour
 */
const MINUTES_PER_HOURS = 60;

/**
 * Hours per day
 */
const HOURS_PER_DAY = 24;

/**
 * Milliseconds per day
 */
const MS_PER_DAY =
	MS_PER_SECOND * SECONDS_PER_MINUTES * MINUTES_PER_HOURS * HOURS_PER_DAY;

/**
 * This function calculates the numerical difference between date 1 and date 2
 *
 * @param {Date} date1 first day, usually the Start Date
 * @param {Date} date2 second day, usually the End Date
 * @returns {number} The difference in days between the two dates, floored.
 */
export const calcDiffInDays = (date1: Date, date2: Date): number => {
	const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
	return Math.floor((utc2 - utc1) / MS_PER_DAY);
};
