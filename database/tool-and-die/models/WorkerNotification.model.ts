import { toolAndDieDatabase } from '../tool-and-die.database';

const WorkerNotificationModel = {
	addNotification: async (notification: WorkerNotif) => {
		await toolAndDieDatabase.workerNotifications.add(notification);
	},
};

export default WorkerNotificationModel;
