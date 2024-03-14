import Dexie, { Table } from 'dexie';

export class ToolAndDieDatabase extends Dexie {
	products!: Table<Product>;
	cart!: Table<Product>;
	orders!: Table<Product>;
	requests!: Table<Product>;
	confirms!: Table<Product>;
	processes!: Table<Product>;
	finals!: Table<Product>;
	approves!: Table<Product>;
	receipts!: Table<Product>;
	timecards!: Table<Product>;
	jobs!: Table<Product>;
	notifications!: Table<Notification>;

	constructor() {
		super('ToolAndDieDatabase');
		this.version(1).stores({
			products: '++id, name, src, type, status',
			cart: '++id, name, src, type, status',
			orders: '++id, name, src, type, status',
			requests: '++id, name, src, type, status',
			confirms: '++id, name, src, type, status',
			processes: '++id, name, src, type, status',
			finals: '++id, name, src, type, status',
			approves: '++id, name, src, type, status',
			receipts: '++id, name, src, type, status',
			timecards: '++id, name, src, type, status',
			jobs: '++id, name, src, type, status',
			notifications: '++id, name, status, user',
		});
	}
}

export const toolAndDieDatabase = new ToolAndDieDatabase();
