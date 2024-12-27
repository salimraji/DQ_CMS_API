const express = require('express')
const router = express.Router();
const sentNotificationController = require('../controllers/sentNotificationController')


router.get('/', sentNotificationController.getSentNotification);
router.patch('/markAsRead', sentNotificationController.markAsRead)


module.exports = router;