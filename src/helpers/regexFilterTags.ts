/**
 * Utility function to aid in the
 *
 * @param text The text to filter with the regex expression
 * @param expr The regex expression executed on the text
 * @returns The result of the regex or undefined if no matches
 */
export const regexFilterTags = (text: string, expr: RegExp): RegExpExecArray | null => expr.exec(text);
