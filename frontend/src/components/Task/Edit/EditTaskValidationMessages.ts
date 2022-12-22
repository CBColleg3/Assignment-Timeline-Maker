/**
 * EditTask component constants
 */
const EDIT_TASK_CONSTANTS = {
	/**
	 * Validation rules applying to the Edit Task description
	 */
	description: {
		/**
		 * Maximum length the task description can be edited to
		 */
		maxLength: 1000,
		/**
		 * Minimum length the task description can be edited to
		 */
		minLength: 20,
		/**
		 * Whether the task description is required or not
		 */
		required: true,
	},
	/**
	 * Validation rules applying to the Edit Task name
	 */
	name: {
		/**
		 * Maximum length the task name can be edited to
		 */
		maxLength: 100,
		/**
		 * Minimum length the task name can be edited to
		 */
		minLength: 5,
		/**
		 * Whether the task name is required or not when editing a task
		 */
		required: true,
	},
	/**
	 * Validation rules applying to the Edit Task points
	 */
	points: {
		/**
		 * The minimum value of points a task can have
		 */
		min: 1,
	},
};

/**
 * Valid constants
 */
const VALID = {
	/**
	 * The validation message for if a task description is valid
	 */
	description: "Valid task description",
	/**
	 * The validation message for if a task due date is valid
	 */
	dueDate: "Valid task due date",
	/**
	 * The validation message for if a task name is valid
	 */
	name: "Valid task name",
	/**
	 * The validation message for if task points are valid
	 */
	points: "Valid task points",
};

/**
 * Invalid constants
 */
const INVALID = {
	/**
	 * The invalid messages for description that display when a specific validation rule has been broken
	 */
	description: {
		/**
		 * If the task description exceeds the maximum length specified above
		 */
		maxLength: `Description must be at most ${EDIT_TASK_CONSTANTS.description.maxLength} characters.`,
		/**
		 * If the task description is less than the minimum length specified above
		 */
		minLength: `Description must be at least ${EDIT_TASK_CONSTANTS.description.minLength} characters.`,
		/**
		 * If the task description is not supplied
		 */
		required: "Description is required.",
	},
	/**
	 * The invalid messages for due date that display when a specific validation rule has been broken
	 */
	dueDate: {
		/**
		 * Specifies that the date is greater then or equal to the supplied date
		 *
		 * @param date - The date we are validating against
		 * @returns - The template string with date included
		 */
		afterStart: (date: string): string => `Greater or equal to ${date}`,
		/**
		 * Specifies that the date is less than or equal to the supplied date
		 *
		 * @param date - The date we are validating against
		 * @returns - The template string with date included
		 */
		beforeEnd: (date: string): string => `Less or equal to ${date}`,
	},
	/**
	 * The invalid messages for due date that display when a specific validation rule has been broken
	 */
	name: {
		/**
		 * The maximum length a task name can be
		 */
		maxLength: `Name must be at most ${EDIT_TASK_CONSTANTS.name.maxLength} characters.`,
		/**
		 * The minimum length a task name can be
		 */
		minLength: `Name must be at least ${EDIT_TASK_CONSTANTS.name.minLength} characters.`,
		/**
		 * Whether a task name is required
		 */
		required: "Name is required.",
	},
	/**
	 * The invalid messages for task points that display when a specific validation rule has been broken
	 */
	points: {
		/**
		 * The points changed is less than the minimum amount of points required
		 */
		min: `Points must be at least ${EDIT_TASK_CONSTANTS.points.min}.`,
	},
};

export { EDIT_TASK_CONSTANTS, INVALID, VALID };
