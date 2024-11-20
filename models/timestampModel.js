const mongoose = require('mongoose');

const timestampSchema = new mongoose.Schema({
    collectionName: { type: String, required: true }, 
    operation: { type: String, required: true }, 
    documentId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    timestamp: { type: Date, default: Date.now },
    performedBy: { type: String },
    details: { type: Object }, 
});

module.exports = mongoose.model('Timestamp', timestampSchema);
