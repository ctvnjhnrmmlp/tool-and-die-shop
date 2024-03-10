import { toolAndDieDatabase } from '../tool-and-die.database';

const RequestModel = {
	addProduct: async (product: Product) => {
		await toolAndDieDatabase.requests.add(product);
	},
	deleteProduct: async (product: Product) => {
		await toolAndDieDatabase.requests.delete(product.id);
	},
};

export default RequestModel;
