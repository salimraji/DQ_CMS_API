const mongoose = require("mongoose");

const timestampSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
  lastUpdated: { type: Date, required: true },
});

const Timestamp = mongoose.model("Timestamp", timestampSchema);

module.exports = Timestamp;
