import { toolAndDieDatabase } from '../tool-and-die.database';

const CartModel = {
	addProduct: async (product: Product) => {
		await toolAndDieDatabase.cart.add(product);
	},
	deleteProduct: async (product: Product) => {
		await toolAndDieDatabase.cart.delete(product.id);
	},
};

export default CartModel;
