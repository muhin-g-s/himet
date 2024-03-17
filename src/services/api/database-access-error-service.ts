/* eslint-disable max-classes-per-file */
export class IndexedDBError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'IndexedDBError';
	}
}

export class ObjectNotFoundError extends IndexedDBError {
	constructor(message = 'Object not found') {
		super(message);
		this.name = 'ObjectNotFoundError';
	}
}

export class DatabaseAccessError extends IndexedDBError {
	constructor(message = 'Database access error') {
		super(message);
		this.name = 'DatabaseAccessError';
	}
}
