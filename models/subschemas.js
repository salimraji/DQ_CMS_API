const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  contact_info: { type: String },
  address: { type: String, required: true },
  longitude: { type: Number },
  latitude: { type: Number },
  order: { type: Number },
  image: { type: String }
});


const simpleContentSchema = new mongoose.Schema({
  content_title: { type: String, required: true },
  description: { type: String, required: true }
});


const basicTemplateSchema = new mongoose.Schema({
  page_title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number },
  image: { type: String }
});

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  contact_info: { type: String },
  address: { type: String, required: true },
  longitude: { type: Number },
  latitude: { type: Number },
  order: { type: Number },
  mohafaza: { type: String, required: true },
  region:{ type: String, required: true },
  image: { type: String }
});

const configurationSchema = new mongoose.Schema({
  key: { type: String },
  value: { type: String }
});

module.exports = { locationSchema, simpleContentSchema, basicTemplateSchema, expertSchema, configurationSchema };
