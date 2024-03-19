import { toolAndDieDatabase } from '../tool-and-die.database';

const PaymentModel = {
	addPayment: async (product: Product) => {
		await toolAndDieDatabase.payments.add(product);
	},
	deletePayment: async (product: Product) => {
		await toolAndDieDatabase.payments.delete(product.id);
	},
};

export default PaymentModel;
