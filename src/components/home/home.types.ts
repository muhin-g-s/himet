export interface INoteFilter {
	date: string | null;
}

export interface INote {
	id: string;
	date?: string;
	name?: string;
	discription?: string;
}
