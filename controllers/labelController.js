const LabelService = require('../services/labelService');

class LabelController {
    async createLabel(req, res) {
        try {
            const labelData = req.body;
            const newLabel = await LabelService.createLabel(labelData, req);
            res.status(201).json(newLabel);
        } catch (error) {
            res.status(500).json({ error: 'Error creating label', details: error.message });
        }
    }

    async getLabels(req, res) {
        try {
            const { page, limit, search } = req.query;
            const data = await LabelService.getLabels({ page: Number(page), limit: Number(limit), search });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching labels', details: error.message });
        }
    }

    async getLabelById(req, res) {
        try {
            const { id } = req.params;
            const label = await LabelService.getLabelById(id);
            if (label) {
                res.json(label);
            } else {
                res.status(404).json({ error: 'Label not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching label', details: error.message });
        }
    }

    async updateLabel(req, res) {
        try {
            const { id } = req.params;
            const labelData = req.body;
            const updatedLabel = await LabelService.updateLabel(id, labelData, req);
            if (updatedLabel) {
                res.json(updatedLabel);
            } else {
                res.status(404).json({ error: 'Label not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error updating label', details: error.message });
        }
    }

    async deleteLabel(req, res) {
        try {
            const { id } = req.params;
            const deletedLabel = await LabelService.deleteLabel(id, req);
            if (deletedLabel) {
                res.json({ message: 'Label deleted successfully' });
            } else {
                res.status(404).json({ error: 'Label not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting label', details: error.message });
        }
    }
}

module.exports = new LabelController();
