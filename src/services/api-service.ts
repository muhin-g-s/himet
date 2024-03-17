import NoteService from './api/note-service';

import { IDataTransferService } from './api/api.types';

export default class ApiService {
	readonly note: NoteService;

	constructor(dataTransferService: IDataTransferService) {
		this.note = new NoteService(dataTransferService);
	}
}
