const sentNotificationService = require('../services/sentNotificationService')


class sentNotificationController {
    async getSentNotification (req, res){
        try {
            const userId = req.query.userId;
            const sentNotifications = await sentNotificationService.getSentNotification(userId);
            res.status(200).json(sentNotifications); 
        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    }

    async markAsRead(req, res) {
        try {
            const ids = req.body.ids; 
            const result = await sentNotificationService.markAsRead(ids);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteNotification(req, res){
        try{
            const { _id } = req.body
            const result = await sentNotificationService.deleteNotification(_id);
            res.json(result);
        }catch(error){
            res.status(500).json({ message: error.message})
        }
    }
}

module.exports = new sentNotificationController()