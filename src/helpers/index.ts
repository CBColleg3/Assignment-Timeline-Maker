import { calcDays } from "./Task/calcDays";
import { calcDiffInDays } from "./Task/calcDiffInDays";
import { calcTotalPoints } from "./Task/calcTotalPoints";
import { colorHex, COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH } from "./shared/colorHex";
import { convertXML2HTML } from "./DocViewer/convertXML2HTML";
import { extractParagraphs } from "./DocViewer/extractParagraphs";
import { readFile } from "./shared/readFile";
import { displayFileWithSize } from "./FileDisplay/displayFileWithSize";
import { parseFileTextToXML } from "./shared/parseFileTextToXML";
import { findParts } from "./Task/findParts";
import { REGEX_EXPRESSIONS } from "./shared/regexExpressions";
import { findPoints } from "./Task/findPoints";
import { updateDueDates } from "./Task/updateDueDates";
import { validateSetDateTimeInput } from "./SetDateTime/validateSetDateTimeInput";
import { calcDayRange } from "./Task/calcDayRange";
import { isSameDay } from "./Task/isSameDay";
import { truncateText } from "./shared/truncateText";
import { isTaskInElement } from "./DocViewer/isTaskInElement";
import { generateRandomColorHex } from "./shared/generateRandomColorHex";
import { generateRandomDate } from "./SetDateTime/generateRandomDate";
import { generateInitialAssignmentDate } from "./SetDateTime/generateInitialAssignmentDate";
import { randomInt } from "./shared/randomInt";
import { getIndexOfSelectedDateInDates } from "./SetDateTime/getIndexOfSelectedDateInDates";
import { assignDatesRank } from "./SetDateTime/assignDatesRank";

/**
 * Base export, exports all utility functions in one object
 */
export {
	assignDatesRank,
	calcDays,
	calcDayRange,
	calcDiffInDays,
	calcTotalPoints,
	colorHex,
	COLOR_HEX_ARRAY,
	COLOR_HEX_ARRAY_LENGTH,
	convertXML2HTML,
	extractParagraphs,
	displayFileWithSize,
	findParts,
	findPoints,
	generateInitialAssignmentDate,
	generateRandomColorHex,
	generateRandomDate,
	getIndexOfSelectedDateInDates,
	isSameDay,
	isTaskInElement,
	parseFileTextToXML,
	randomInt,
	readFile,
	REGEX_EXPRESSIONS,
	updateDueDates,
	truncateText,
	validateSetDateTimeInput,
};
