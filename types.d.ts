interface Product {
	id: number;
	name: string;
	src: string;
	type: string;
	status:
		| string
		| 'pending'
		| 'requested'
		| 'confirmed'
		| 'processing'
		| 'finalizing'
		| 'approved';
}
