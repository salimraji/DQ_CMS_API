const LabelRepository = require('../repositories/labelRepository');
const timestampService = require('./timestampService');

class LabelService {
    async createLabel(labelData, req) {
        const label = await LabelRepository.createLabel(labelData);
        await timestampService.logOperation({
            collectionName: 'labels',
            operation: 'create',
            documentId: label._id,
            performedBy: req.user?.email, // Optional: user performing the action
            details: { label: labelData },
        });
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
        await timestampService.logOperation({
            collectionName: 'labels',
            operation: 'update',
            documentId: labelId,
            performedBy: req.user?.email,
            details: { updatedFields: labelData },
        });
        return updatedLabel;
    }

    async deleteLabel(labelId, req) {
        const deletedLabel = await LabelRepository.deleteLabel(labelId);
        if (!deletedLabel) {
            throw new Error('Label not found');
        }
        await timestampService.logOperation({
            collectionName: 'labels',
            operation: 'delete',
            documentId: labelId,
            performedBy: req.user?.email,
        });
        return deletedLabel;
    }
}

module.exports = new LabelService();
