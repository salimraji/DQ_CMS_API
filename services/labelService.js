const LabelRepository = require('../repositories/labelRepository');

class LabelService {
    async createLabel(labelData) {
        return await LabelRepository.createLabel(labelData);
    }

    async getLabels({ page = 1, limit = 10, search = '' }) {
        const skip = (page - 1) * limit;
        const query = search
            ? { $or: [{ Tag: { $regex: search, $options: 'i' } }, { English: { $regex: search, $options: 'i' } }] }
            : {};

        const labels = await LabelRepository.findLabels(query, limit, skip);
        const total = await LabelRepository.countLabels(query);

        return { labels, total };
    }

    async getLabelById(labelId) {
        return await LabelRepository.findLabelById(labelId);
    }

    async updateLabel(labelId, labelData) {
        return await LabelRepository.updateLabel(labelId, labelData);
    }

    async deleteLabel(labelId) {
        return await LabelRepository.deleteLabel(labelId);
    }
}

module.exports = new LabelService();
