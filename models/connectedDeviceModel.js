const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const connectedDeviceSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    }
})

connectedDeviceSchema.index({ userId: 1 })

module.exports = mongoose.model("ConnectedDevice", connectedDeviceSchema)