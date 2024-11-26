const LabelRepository = require('../repositories/labelRepository');
const timestampService = require('../services/timestampService');

class LabelService {
    async createLabel(labelData, req) {
        const label = await LabelRepository.createLabel(labelData);

        // Update timestamp for Labels collection
        await timestampService.updateTimestamp("Labels");

        return label;
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
        const label = await LabelRepository.findLabelById(labelId);
        if (!label) {
            throw new Error('Label not found');
        }
        return label;
    }

    async updateLabel(labelId, labelData, req) {
        const updatedLabel = await LabelRepository.updateLabel(labelId, labelData);
        if (!updatedLabel) {
            throw new Error('Label not found');
        }

        // Update timestamp for Labels collection
        await timestampService.updateTimestamp("Labels");

        return updatedLabel;
    }

    async deleteLabel(labelId, req) {
        const deletedLabel = await LabelRepository.deleteLabel(labelId);
        if (!deletedLabel) {
            throw new Error('Label not found');
        }

        await timestampService.updateTimestamp("Labels");

        return deletedLabel;
    }
}

module.exports = new LabelService();
