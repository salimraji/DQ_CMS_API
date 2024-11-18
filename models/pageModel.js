const mongoose = require('mongoose');
const { locationSchema, simpleContentSchema, basicTemplateSchema, expertSchema, configurationSchema } = require('./subschemas');

const contentSchema = new mongoose.Schema({}, { _id: true, strict: false });

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  page_type: { type: String, required: true },
  content: [contentSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

pageSchema.pre('validate', function (next) {
  let schema;

//Checks with page type

  switch (this.page_type) {
    case 'Branches':
    case 'Workshops':
    case 'Hospitals':
    case 'Emergencies':
      schema = locationSchema;
      break;

    case 'Experts':
      schema = expertSchema;
      break;

    case 'Configurations':
      schema = configurationSchema;
      break;

    case 'AboutUs':
    case 'PrivacyPolicy':
      schema = simpleContentSchema;
      break;

    case 'FNOLTowing':
    case 'Tutorial':
    case 'Logos':
    case 'SideMenu':
    case 'PolicyMenu':
    case 'ProductList':
    case 'SubProducts':
    case 'HomeScreen':
    case 'SocialMedia':
    case 'FNOLExperts':
      schema = basicTemplateSchema;
      break;

    default:
      return next(new Error('Invalid page_type'));
  }

  for (let i = 0; i < this.content.length; i++) {
    const item = this.content[i];
    const contentInstance = new mongoose.Document(item, schema);
    const contentValidationError = contentInstance.validateSync();

    if (contentValidationError) {
      return next(contentValidationError);
    }

    this.content[i] = contentInstance.toObject();
  }

  next();
});

module.exports = mongoose.model('Page', pageSchema);
