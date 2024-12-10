const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    name: { type: String },
    uuid: { type: String },
    os: { type: String },
    os_version: { type: String },
    manufacturer: { type: String },
    token: { type: String }

})


deviceSchema.index({ id: 1 })

module.exports = mongoose.model('Device', deviceSchema)