import { toolAndDieDatabase } from '../tool-and-die.database';

const AdminNotificationModel = {
	addNotification: async (notification: AdminNotif) => {
		await toolAndDieDatabase.adminNotifications.add(notification);
	},
};

export default AdminNotificationModel;
