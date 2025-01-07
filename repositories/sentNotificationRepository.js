const SentNotification = require('../models/sentNotificationModel');


class SentNotificationRepository {
    async getSentNotification (userId) {
        return SentNotification.find({ userId: userId });
    }


    async saveSentNotification(data) {
        const notification = new SentNotification(data);
        return notification.save();
    }

    async markAsRead(ids) {
        return await SentNotification.updateMany(
            { _id: { $in: ids } },
            { $set: { isSeen: true } } 
        );
    }

    async deleteNotification(_id) {
        return SentNotification.deleteOne({ _id: _id });
    }
    
}

module.exports = new SentNotificationRepository();