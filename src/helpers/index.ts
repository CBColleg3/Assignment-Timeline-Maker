import { calcDays } from "./calcDays";
import { calcDiffInDays } from "./calcDiffInDays";
import { calcTotalPoints } from "./calcTotalPoints";
import { colorHex, COLOR_HEX_ARRAY, COLOR_HEX_ARRAY_LENGTH } from "./colorHex";
import { convertTextChunk } from "./convertTextChunk";
import { convertXML2HTML } from "./convertXML2HTML";
import { extractParagraphs } from "./extractParagraphs";
import { readFile } from "./readFile";
import { displayFileWithSize } from "./displayFileWithSize";
import { parseFileTextToXML } from "./parseFileTextToXML";
import { findParts } from "./findParts";
import { REGEX_EXPRESSIONS } from "./regexExpressions";
import { findPoints } from "./findPoints";
import { regexFilterTags } from "./regexFilterTags";
import { updateDueDates } from "./updateDueDates";
import { validateSetDateTimeInput } from "./validateSetDateTimeInput";

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
	readFile,
	displayFileWithSize,
	parseFileTextToXML,
	findParts,
	REGEX_EXPRESSIONS,
	findPoints,
	regexFilterTags,
	updateDueDates,
	validateSetDateTimeInput,
};
