export type AssignmentDate = {
	/**
	 * Returns a clone of the internal `date` member
	 */
	cloneDate?: () => Date;
	/**
	 * The color of the date
	 */
	color: string;
	/**
	 * The date instance that these properties are mapped to
	 */
	date: Date;
	/**
	 * The rank of the date
	 */
	rank: number;
};
