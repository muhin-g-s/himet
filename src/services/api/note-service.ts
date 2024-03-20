import { IDataTransferService } from './api.types';

export interface INoteResponse {
	date?: string;
	name?: string;
	discription?: string;
}

export interface INoteRequest {
	id: string;
	date?: string;
	name?: string;
	discription?: string;
}

export default class NoteService {
	private dataTransferService: IDataTransferService;

	constructor(dataTransferService: IDataTransferService) {
		this.dataTransferService = dataTransferService;
	}

	async create(note: INoteResponse): Promise<string> {
		return this.dataTransferService.create(note);
	}

	async update(note: INoteResponse, id: string): Promise<string> {
		return this.dataTransferService.update(note, id);
	}

	async read(id: string): Promise<INoteRequest> {
		return this.dataTransferService.read(id);
	}

	async delete(id: string) {
		return this.dataTransferService.delete(id);
	}

	async getAll(): Promise<INoteRequest[]> {
		return this.dataTransferService.getAll();
	}

	async sortByDate(value: string): Promise<INoteRequest[]> {
		return this.dataTransferService.sortByValue('date', value);
	}
}
