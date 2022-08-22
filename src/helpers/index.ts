import { calcDays } from "./Task/calcDays";
import { calcDiffInDays } from "./Task/calcDiffInDays";
import { calcTotalPoints } from "./Task/calcTotalPoints";
import { colorHex, COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH } from "./shared/colorHex";
import { convertXML2HTML } from "./DocViewer/convertXML2HTML";
import { colorHexs } from "./DocViewer/colorMap";
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

/**
 * Base export, exports all utility functions in one object
 */
export {
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
	isSameDay,
	parseFileTextToXML,
	readFile,
	REGEX_EXPRESSIONS,
	updateDueDates,
	validateSetDateTimeInput,
	colorHexs,
};
