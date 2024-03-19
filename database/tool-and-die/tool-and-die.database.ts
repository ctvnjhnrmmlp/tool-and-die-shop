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
	payments!: Table<Product>;
	timecards!: Table<Product>;
	customerNotifications!: Table<CustomerNotif>;
	adminNotifications!: Table<AdminNotif>;
	workerNotifications!: Table<WorkerNotif>;
	cisNotifications!: Table<CISNotif>;

	constructor() {
		super('ToolAndDieDatabase');
		this.version(1).stores({
			products:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			cart: '++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			orders:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			requests:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			confirms:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			processes:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			finals:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			approves:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			receipts:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			payments:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			timecards:
				'++id, name, src, type, status, processStart, processEnd, delivery, manufacturer, modelNumber, yearManufactured, location, purchaseDate, purchasePrice, warrantyExpires, powerRequirements, weight, usageHours, brand, material, quantity',
			customerNotifications: '++id, name, type',
			adminNotifications: '++id, name, type',
			workerNotifications: '++id, name, type',
			cisNotifications: '++id, name, type',
		});
	}
}

export const toolAndDieDatabase = new ToolAndDieDatabase();
