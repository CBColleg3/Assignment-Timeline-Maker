import { calcDays } from "./Task/calcDays";
import { calcDiffInDays } from "./Task/calcDiffInDays";
import { calcTotalPoints } from "./Task/calcTotalPoints";
import { colorHex, COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH } from "./shared/colorHex";
import { convertTextChunk } from "./DocViewer/convertTextChunk";
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
import { getHighlightStyle } from "./DocViewer/getHighlightStyle";
import { getTextStyle } from "./DocViewer/getTextStyle";
import { getBackgroundStyle } from "./DocViewer/getBackgroundStyle";
import { highlightTask } from "./DocViewer/highlightTask";
import { styleContent } from "./DocViewer/styleContent";

/**
 * Base export, exports all utility functions in one object
 */
export {
	calcDays,
	calcDiffInDays,
	calcTotalPoints,
	colorHex,
	COLOR_HEX_ARRAY,
	COLOR_HEX_ARRAY_LENGTH,
	convertTextChunk,
	convertXML2HTML,
	extractParagraphs,
	displayFileWithSize,
	findParts,
	findPoints,
	getHighlightStyle,
	getTextStyle,
	getBackgroundStyle,
	highlightTask,
	parseFileTextToXML,
	readFile,
	REGEX_EXPRESSIONS,
	styleContent,
	updateDueDates,
	validateSetDateTimeInput,
};
