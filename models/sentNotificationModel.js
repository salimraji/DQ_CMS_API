const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sentNotificationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    dateReceived:{
        type: String,
        required: true
    },
    isSeen: {
        type: Boolean,
        default: false
    }

}) 

sentNotificationSchema.index({ userId: 1 })

module.exports = mongoose.model('SentNotification', sentNotificationSchema)