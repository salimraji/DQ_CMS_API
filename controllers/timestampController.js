const Timestamp = require('../models/timestampModel');

class TimestampController {
    async getLogs(req, res) {
        try {
            const { collectionName, operation, documentId, userId } = req.query;
            const filters = {};
            if (collectionName) filters.collectionName = collectionName;
            if (operation) filters.operation = operation;
            if (documentId) filters.documentId = documentId;
            if (userId) filters.performedBy = userId;

            const logs = await Timestamp.find(filters).sort({ timestamp: -1 });
            res.status(200).json(logs);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching logs', details: error.message });
        }
    }
}

module.exports = new TimestampController();
