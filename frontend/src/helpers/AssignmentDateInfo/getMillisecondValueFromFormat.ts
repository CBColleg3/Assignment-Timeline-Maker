import type { iAssignmentDateInfoContextFormat } from "src/@types";
import { milliseconds } from "src/common";

/**
 * Function for returning the proper milliseconds value depending on what the format for the dates is
 *
 * @param format - The iAssignmentDateInfoContextFormat, which specifies which format all the tasks fall under when it comes to calculating days
 * @returns The milliseconds value associated with the format
 */
export const getMillisecondValueFromFormat = (format: iAssignmentDateInfoContextFormat): number => {
	switch (format) {
		case "day": {
			return milliseconds.DAY;
		}
		case "hour": {
			return milliseconds.HOUR;
		}
		case "minute": {
			return milliseconds.MINUTE;
		}
		case "week": {
			return milliseconds.WEEK;
		}
		case "second": {
			return milliseconds.SECOND;
		}
		default: {
			return milliseconds.NOT_SUPPORTED;
		}
	}
};
