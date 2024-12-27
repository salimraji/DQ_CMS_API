const sentNotificationRepository =  require('../repositories/sentNotificationRepository')

class SentNotificationService{
    async getSentNotification (userId){
        return await sentNotificationRepository.getSentNotification(userId)

    }

    async markAsRead(ids) {
        return await sentNotificationRepository.markAsRead(ids);
    }
}

module.exports = new SentNotificationService();