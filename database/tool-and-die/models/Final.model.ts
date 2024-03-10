import { toolAndDieDatabase } from '../tool-and-die.database';

const FinalModel = {
	addProduct: async (product: Product) => {
		await toolAndDieDatabase.finals.add(product);
	},
	deleteProduct: async (product: Product) => {
		await toolAndDieDatabase.finals.delete(product.id);
	},
};

export default FinalModel;
