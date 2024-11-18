const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    Tag: { type: String },
    English: { type: String },
    Arabic: { type: String },
    French: { type: String },
    Spanish: { type: String },
    German: { type: String }
});

labelSchema.index({ Tag: 1 }); 
labelSchema.index({ English: 1 });

module.exports = mongoose.model('Label', labelSchema);
