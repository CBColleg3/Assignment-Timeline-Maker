// Houses all regex expression, will grow in size as more regex expressions are used

/**
 * The expression to generate all potential tasks
 */
const TASK_EXPR = /[^.,;]*\d\d?\s?(points?|pts?)[^.,;]*(\.|,|;)/gu;

/**
 * The expression to parse points amount from the parsed tasks
 */
const POINTS_AMT_EXPR = /\d+\s?(?<pts>points?|pts?)/gu;

/**
 * The expression to parse the word points/pts text from the parsed tasks
 */
const POINTS_EXPR = /(points?|pts?)/gu;

/**
 * All Regex expressions (regular expression expressions (I know, it's confusing)) exported
 */
export const REGEX_EXPRESSIONS = {
	POINTS_AMT_EXPR,
	POINTS_EXPR,
	TASK_EXPR,
};
