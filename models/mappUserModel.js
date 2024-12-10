const mongoose = require('mongoose');

const mappUserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    deviceIds: { type: [String], default: [] },
    settings: { type: Object, default: {} }
});

mappUserSchema.index({ id: 1 });

module.exports = mongoose.model('MAppUser', mappUserSchema);