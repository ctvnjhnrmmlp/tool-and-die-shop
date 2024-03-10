import { toolAndDieDatabase } from '../tool-and-die.database';

const OrderModel = {
	addProduct: async (product: Product) => {
		await toolAndDieDatabase.orders.add(product);
	},
	deleteProduct: async (product: Product) => {
		await toolAndDieDatabase.orders.delete(product.id);
	},
};

export default OrderModel;
