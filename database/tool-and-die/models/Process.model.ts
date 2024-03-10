import { toolAndDieDatabase } from '../tool-and-die.database';

const ProcessModel = {
	addProduct: async (product: Product) => {
		await toolAndDieDatabase.processes.add(product);
	},
	deleteProduct: async (product: Product) => {
		await toolAndDieDatabase.processes.delete(product.id);
	},
};

export default ProcessModel;
