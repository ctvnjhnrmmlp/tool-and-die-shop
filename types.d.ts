interface Equipment {
	manufacturer: string;
	modelNumber: string;
	yearManufactured: number;
	location: string;
	purchaseDate: string;
	purchasePrice: number;
	warrantyExpires: string;
	powerRequirements: string;
	weight: string;
	usageHours: number;
}

interface Tool {
	brand: string;
	material: string;
	quantity: number;
	price: number;
}

interface Product extends Equipment, Tool {
	id: number;
	name: string;
	src: string;
	type: string;
	status: string;
	processStart: string;
	processEnd: string;
	delivery: string;
}

interface CustomerNotif {
	name: string;
	type:
		| 'add-product-to-cart'
		| 'remove-product-from-cart'
		| 'ordered'
		| 'pay'
		| 'release';
}

interface AdminNotif {
	name: string;
	type: 'add-product' | 'remove-product' | 'requested';
}

interface WorkerNotif {
	name: string;
	type: 'confirmed' | 'processing' | 'finalizing';
}

interface CISNotif {
	name: string;
	type: 'approved';
}
