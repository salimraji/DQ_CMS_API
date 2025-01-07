const sentNotificationRepository =  require('../repositories/sentNotificationRepository')

class SentNotificationService{
    async getSentNotification (userId){
        return await sentNotificationRepository.getSentNotification(userId)

    }

    async markAsRead(ids) {
        return await sentNotificationRepository.markAsRead(ids);
    }

    async deleteNotification(_id){
        return await sentNotificationRepository.deleteNotification(_id)
    }
}

module.exports = new SentNotificationService();