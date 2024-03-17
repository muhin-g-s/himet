import { DatabaseAccessError, IndexedDBError, ObjectNotFoundError } from './database-access-error-service';

export const enum DatabaseFieldUniquenessEnum {
	Unique,
	NoUnique,
}

type DatabaseSchemeType = Record<string, DatabaseFieldUniquenessEnum>;

type DatabaseSchemeFieldsType = {
	[K in keyof DatabaseSchemeType]: unknown;
};

export interface IDatabaseAccessServiceConfig {
	nameDb: string;
	versionDb: number;
	nameStore: string;
	dbScheme: DatabaseSchemeType;
	primaryKey: string;
}

export default class DatabaseAccessService {
	private databaseAccessServiceConfig;

	private database: IDBDatabase | null = null;
	private indexedDB: IDBFactory;

	constructor(databaseAccessServiceConfig: IDatabaseAccessServiceConfig) {
		this.indexedDB = window.indexedDB;

		this.databaseAccessServiceConfig = databaseAccessServiceConfig;
	}

	private async connect(): Promise<void> {
		const { nameDb, versionDb } = this.databaseAccessServiceConfig;

		return new Promise<void>((resolve, reject) => {
			if (!('indexedDB' in window)) {
				reject(new IndexedDBError('Cannot find indexedDB in window'));
				return;
			}

			const dbOpenRequest = this.indexedDB.open(nameDb, versionDb);

			dbOpenRequest.onsuccess = () => {
				this.database = dbOpenRequest.result;
				resolve();
			};

			dbOpenRequest.onerror = () => {
				reject(new DatabaseAccessError('Database request failed'));
			};

			dbOpenRequest.onupgradeneeded = async () => {
				this.database = dbOpenRequest.result;
				this.createDB();
				resolve(await this.connect());
			};
		});
	}

	private createDB(): void {
		const { nameStore, dbScheme, primaryKey } = this.databaseAccessServiceConfig;

		if (!this.database) {
			return;
		}

		const objectStore = this.database.createObjectStore(nameStore, {
			keyPath: primaryKey,
		});

		Object.keys(dbScheme)
			.filter(key => key !== primaryKey)
			.forEach(key => {
				objectStore.createIndex(key, key, {
					unique: dbScheme[key] === DatabaseFieldUniquenessEnum.Unique,
				});
			});
	}

	private async performRequest<T>(
		requestFn: () => IDBRequest<T> | undefined,
		item?: DatabaseSchemeFieldsType,
	): Promise<T> {
		if (!this.database) {
			await this.connect();
		}
		const { primaryKey } = this.databaseAccessServiceConfig;

		return new Promise<T>((resolve, reject) => {
			if (item && !item[primaryKey]) {
				reject(new ObjectNotFoundError('Missing primary key'));
				return;
			}

			const request = requestFn();

			if (!request) {
				reject(new DatabaseAccessError('Invalid request'));
				return;
			}

			request.onerror = () => {
				reject(new DatabaseAccessError('Database request failed'));
			};

			request.onsuccess = () => resolve(request.result);
		});
	}

	async create(item: DatabaseSchemeFieldsType): Promise<IDBValidKey> {
		const { nameStore } = this.databaseAccessServiceConfig;

		const addObject = () => this.database?.transaction([nameStore], 'readwrite').objectStore(nameStore).add(item);

		return this.performRequest<IDBValidKey>(addObject, item);
	}

	async update(item: DatabaseSchemeFieldsType) {
		const { nameStore } = this.databaseAccessServiceConfig;

		const updateObject = () =>
			this.database?.transaction([nameStore], 'readwrite').objectStore(nameStore).put(item);

		return this.performRequest<IDBValidKey>(updateObject, item);
	}

	async read(item: DatabaseSchemeFieldsType): Promise<DatabaseSchemeFieldsType> {
		const { primaryKey, nameStore } = this.databaseAccessServiceConfig;

		const readObject = () =>
			this.database
				?.transaction([nameStore], 'readwrite')
				.objectStore(nameStore)
				.get(item[primaryKey] as IDBValidKey);

		return this.performRequest<DatabaseSchemeFieldsType>(readObject, item);
	}

	async delete(item: DatabaseSchemeFieldsType): Promise<undefined> {
		const { primaryKey, nameStore } = this.databaseAccessServiceConfig;

		const deleteObject = () =>
			this.database
				?.transaction([nameStore], 'readwrite')
				.objectStore(nameStore)
				.delete(item[primaryKey] as IDBValidKey);

		return this.performRequest<undefined>(deleteObject, item);
	}

	async getAll(): Promise<DatabaseSchemeFieldsType[]> {
		const { nameStore } = this.databaseAccessServiceConfig;

		const deleteObject = () => {
			const objectStore = this.database?.transaction([nameStore], 'readonly').objectStore(nameStore);

			return objectStore?.getAll();
		};

		return this.performRequest<DatabaseSchemeFieldsType[]>(deleteObject);
	}
}
