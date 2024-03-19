import { toolAndDieDatabase } from '../tool-and-die.database';

const CustomerNotificationModel = {
	addNotification: async (notification: CustomerNotif) => {
		await toolAndDieDatabase.customerNotifications.add(notification);
	},
};

export default CustomerNotificationModel;
