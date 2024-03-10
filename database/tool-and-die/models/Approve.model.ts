import { toolAndDieDatabase } from '../tool-and-die.database';

const ApproveModel = {
	addProduct: async (product: Product) => {
		await toolAndDieDatabase.approves.add(product);
	},
	deleteProduct: async (product: Product) => {
		await toolAndDieDatabase.approves.delete(product.id);
	},
};

export default ApproveModel;
