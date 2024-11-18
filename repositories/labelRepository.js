const Label = require('../models/labelModel');

class LabelRepository {
    async createLabel(data) {
        return new Label(data).save();
    }

    async findLabels(query = {}, limit = 10, skip = 0) {
        return Label.find(query).limit(limit).skip(skip);
    }

    async countLabels(query = {}) {
        return Label.countDocuments(query);
    }

    async findLabelById(id) {
        return Label.findById(id);
    }

    async updateLabel(id, data) {
        return Label.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteLabel(id) {
        return Label.findByIdAndDelete(id);
    }
}

module.exports = new LabelRepository();
