export type Task = {
	name: string;
	id: number;
	description: string;
	points: number;
	color: string;
	dueDate: Date;
	autoDueDate: boolean;
};
