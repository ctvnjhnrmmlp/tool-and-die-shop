import { toolAndDieDatabase } from '../tool-and-die.database';

const ProductModel = {
	addProduct: async (product: Product) => {
		await toolAndDieDatabase.products.add(product);
	},
	updateProduct: async (product: Product) => {
		await toolAndDieDatabase.products.update(product.id, product);
	},
	deleteProduct: async (product: Product) => {
		await toolAndDieDatabase.products.delete(product.id);
	},
};

export default ProductModel;
