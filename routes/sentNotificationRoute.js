const express = require('express')
const router = express.Router();
const sentNotificationController = require('../controllers/sentNotificationController')


router.get('/', sentNotificationController.getSentNotification);
router.patch('/markAsRead', sentNotificationController.markAsRead)
router.delete('/deleteNotification', sentNotificationController.deleteNotification)


module.exports = router;