import { toolAndDieDatabase } from '../tool-and-die.database';

const CISNotificationModel = {
	addNotification: async (notification: CISNotif) => {
		await toolAndDieDatabase.cisNotifications.add(notification);
	},
};

export default CISNotificationModel;
