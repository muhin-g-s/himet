import DatabaseAccessService, {
	DatabaseFieldUniquenessEnum,
	type IDatabaseAccessServiceConfig,
} from './database-access-service';

const PRIMARY_KEY = 'id';

const DATABASE_SCHEME = {
	[PRIMARY_KEY]: DatabaseFieldUniquenessEnum.Unique,
	date: DatabaseFieldUniquenessEnum.NoUnique,
	name: DatabaseFieldUniquenessEnum.NoUnique,
	discription: DatabaseFieldUniquenessEnum.NoUnique,
};

type DatabaseResponseType = {
	[K in keyof Omit<typeof DATABASE_SCHEME, typeof PRIMARY_KEY>]?: string;
};

type DatabaseKeySortRequestType = keyof DatabaseResponseType;

type DatabaseRequestType = {
	[K in keyof typeof DATABASE_SCHEME]?: string;
} & { [PRIMARY_KEY]: string };

export default class DatabaseService {
	private databaseAccessService: DatabaseAccessService;

	constructor() {
		const databaseAccessServiceConfig: IDatabaseAccessServiceConfig = {
			nameDb: 'nameDb',
			versionDb: 1,
			nameStore: 'nameStore',
			dbScheme: DATABASE_SCHEME,
			primaryKey: PRIMARY_KEY,
		};

		this.databaseAccessService = new DatabaseAccessService(databaseAccessServiceConfig);
	}

	private getId(): string {
		return new Date().getTime().toString();
	}

	async create(note: DatabaseResponseType): Promise<string> {
		return this.databaseAccessService.create({ ...note, [PRIMARY_KEY]: this.getId() }) as Promise<string>;
	}

	async update(note: DatabaseResponseType, id: string): Promise<string> {
		return this.databaseAccessService.update({ ...note, [PRIMARY_KEY]: id }) as Promise<string>;
	}

	async read(id: string): Promise<DatabaseRequestType> {
		return this.databaseAccessService.read({ [PRIMARY_KEY]: id }) as unknown as DatabaseRequestType;
	}

	async delete(id: string) {
		return this.databaseAccessService.delete({ [PRIMARY_KEY]: id });
	}

	async getAll(): Promise<DatabaseRequestType[]> {
		return this.databaseAccessService.getAll() as unknown as DatabaseRequestType[];
	}

	async sortByValue(noteKey: DatabaseKeySortRequestType, value: string): Promise<DatabaseRequestType[]> {
		return this.databaseAccessService.sortByValue(noteKey, value) as unknown as DatabaseRequestType[];
	}
}
