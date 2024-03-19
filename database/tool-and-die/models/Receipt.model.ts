import { toolAndDieDatabase } from '../tool-and-die.database';

const ReceiptModel = {
	addReceipt: async (product: Product) => {
		await toolAndDieDatabase.receipts.add(product);
	},
};

export default ReceiptModel;
