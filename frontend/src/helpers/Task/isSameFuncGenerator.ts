/* eslint-disable no-unused-vars -- disabled */
import type { iAssignmentDateInfoContextFormat } from "src/@types";
import { isSameDay } from "./isSameDay";
import { isSameHour } from "./isSameHour";
import { isSameMinute } from "./isSameMinute";
import { isSameMonth } from "./isSameMonth";
import { isSameSecond } from "./isSameSecond";
import { isSameYear } from "./isSameYear";

type isSameFuncGeneratorReturnValue = (_date1: Date | undefined, _date2: Date | undefined) => boolean;

const formatMapping: {
	[key in iAssignmentDateInfoContextFormat]: (
		_date1: Date | undefined,
		_date2: Date | undefined,
	) => boolean;
} = {
	day: isSameDay,
	hour: isSameHour,
	minute: isSameMinute,
	month: isSameMonth,
	second: isSameSecond,
	year: isSameYear,
};

/**
 * Generator function for providing the comparison function supplied with the AssignmentDate format
 *
 * @param format - The current AssignmentDate format
 * @returns The function for comparing dates corresponding to the format given
 */
export const isSameFuncGenerator = (
	format: iAssignmentDateInfoContextFormat,
): isSameFuncGeneratorReturnValue => formatMapping[format];
