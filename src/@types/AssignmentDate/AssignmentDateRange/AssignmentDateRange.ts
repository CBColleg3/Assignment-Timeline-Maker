import type { AssignmentDate } from "../AssignmentDate";

export type AssignmentDateRange = {
	dates: AssignmentDate[];
	end: AssignmentDate;
	start: AssignmentDate;
};
