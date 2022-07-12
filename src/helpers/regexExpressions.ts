// Houses all regex expression, will grow in size as more regex expressions are used

const TASK_EXPR = /[^.,;]*\d\d?\s?(points?|pts?)[^.,;]*(\.|,|;)/gu;

const POINTS_AMT_EXPR = /\\d+\\s?(?<pts>points?|pts?)/gu;

const POINTS_EXPR = /(points?|pts?)/gu;

export const REGEX_EXPRESSIONS = {
	POINTS_AMT_EXPR,
	POINTS_EXPR,
	TASK_EXPR,
};
