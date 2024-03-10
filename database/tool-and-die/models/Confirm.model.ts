import { toolAndDieDatabase } from '../tool-and-die.database';

const ConfirmModel = {
	addProduct: async (product: Product) => {
		await toolAndDieDatabase.confirms.add(product);
	},
	deleteProduct: async (product: Product) => {
		await toolAndDieDatabase.confirms.delete(product.id);
	},
};

export default ConfirmModel;
