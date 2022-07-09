export interface Task {
	name: string;
	id: number;
	document: string;
	points: string;
	color: number;
	dueDate: Date;
	autoDueDate: boolean;
}
