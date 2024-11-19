const mongoose = require('mongoose');

const DetailChildSchema = new mongoose.Schema({
    Key: { type: String, required: true },
    Value: { type: String, required: true },
    Type: { type: Number },
    ContentDetailsID: { type: Number },
    LanguageCode: { type: String },
    Children: { type: [this], default: [] },
    Order: { type: Number }
});

const DetailSchema = new mongoose.Schema({
    Key: { type: String, required: true },
    Value: { type: String, required: true },
    Type: { type: Number },
    ContentDetailsID: { type: Number },
    LanguageCode: { type: String },
    Children: { type: [DetailChildSchema], default: [] },
    Order: { type: Number }
});

const MainSchema = new mongoose.Schema({
    Guid: { type: String, required: true },
    Media: { type: mongoose.Schema.Types.Mixed, default: null },
    Tag: { type: String, required: true },
    Title: { type: String, default: null },
    Details: { type: [DetailSchema], default: [] },
    Order: { type: Number }
});

module.exports = mongoose.model('Page', MainSchema);
