import { toolAndDieDatabase } from '../tool-and-die.database';

const ProductModel = {
	deleteProduct: async (product: Product) => {
		await toolAndDieDatabase.products.delete(product.id);
	},
};

export default ProductModel;
