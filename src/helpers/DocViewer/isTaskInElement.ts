/**
 * This function tests if the task field text is within the parsed element text
 *
 * @param taskFields The task fields we are comparing to the elementText with
 * @param elementText The element text we are using as the comparison base
 * @returns Whether any text field is within the elementText
 */
export const isTaskInElement = (taskFields: string[], elementText: string): boolean =>
	taskFields.some((eachTaskField) => eachTaskField.toLowerCase().includes(elementText.toLowerCase())) ||
	taskFields.some((eachTaskField) => elementText.toLowerCase().includes(eachTaskField.toLowerCase()));
