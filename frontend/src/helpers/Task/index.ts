/**
 * This is an index file, used for when other files import this module, they only have to import from the folder name, and not the individual files.
 * Think of it as exporting the entire folder and any other file that imports from this folder using only the foldername.
 * It receives all contents of the folder without having to access the individual files.
 */

export { calcDayRange } from "./calcDayRange";
export { calcDays } from "./calcDays";
export * from "./calcDiff";
export { calcHourRange } from "./calcHourRange";
export { calcTotalPoints } from "./calcTotalPoints";
export { findParts } from "./findParts";
export { findPoints } from "./findPoints";
export { generateNewTask } from "./generateNewTask";
export { isSameDay } from "./isSameDay";
export { updateDueDates } from "./updateDueDates";
export { isSameFuncGenerator } from "./isSameFuncGenerator";
export { isSameHour } from "./isSameHour";
export { isSameMinute } from "./isSameMinute";
export { isSameMonth } from "./isSameMonth";
export { isSameSecond } from "./isSameSecond";
export { isSameYear } from "./isSameYear";
