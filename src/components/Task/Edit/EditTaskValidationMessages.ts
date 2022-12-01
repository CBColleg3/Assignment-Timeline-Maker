/**
 * EditTask component constants
 */
const EDIT_TASK_CONSTANTS = {
	description: {
		maxLength: 1000,
		minLength: 20,
		required: true,
	},
	name: {
		maxLength: 100,
		minLength: 5,
		required: true,
	},
	points: {
		min: 1,
	},
};

/**
 * Valid constants
 */
const VALID = {
	description: "Valid task description",
	dueDate: "Valid task due date",
	name: "Valid task name",
	points: "Valid task points",
};

/**
 * Invalid constants
 */
const INVALID = {
	description: {
		maxLength: `Description must be at most ${EDIT_TASK_CONSTANTS.description.maxLength} characters.`,
		minLength: `Description must be at least ${EDIT_TASK_CONSTANTS.description.minLength} characters.`,
		required: "Description is required.",
	},
	dueDate: {
		afterStart: (date: string): string => `Greater or equal to ${date}`,
		beforeEnd: (date: string): string => `Less or equal to ${date}`,
	},
	name: {
		maxLength: `Name must be at most ${EDIT_TASK_CONSTANTS.name.maxLength} characters.`,
		minLength: `Name must be at least ${EDIT_TASK_CONSTANTS.name.minLength} characters.`,
		required: "Name is required.",
	},
	points: {
		min: `Points must be at least ${EDIT_TASK_CONSTANTS.points.min}.`,
	},
};

export { EDIT_TASK_CONSTANTS, INVALID, VALID };
