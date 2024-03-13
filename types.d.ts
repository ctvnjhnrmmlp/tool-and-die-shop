interface Product {
	id: number;
	name: string;
	src: string;
	type: string;
	status: string;
}

interface Notification {
	id: number;
	name: string;
	status: string;
	user: 'customer' | 'admin' | 'worker' | 'cis';
}
