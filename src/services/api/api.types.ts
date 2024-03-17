export interface IDataTransferResponse {
	date?: string;
	name?: string;
	discription?: string;
}

export interface IDataTransferRequest {
	id: string;
	date?: string;
	name?: string;
	discription?: string;
}

export interface IDataTransferService {
	create(note: IDataTransferResponse): Promise<string>;
	update(note: IDataTransferResponse, id: string): Promise<string>;
	read(id: string): Promise<IDataTransferRequest>;
	delete(id: string): Promise<void>;
	getAll(): Promise<IDataTransferRequest[]>;
}
