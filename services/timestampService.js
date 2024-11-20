const Timestamp = require('../models/timestampModel');

class TimestampService {
    async logOperation({ collectionName, operation, documentId, performedBy, details = {} }) {
        try {
            const timestamp = new Timestamp({ collectionName, operation, documentId, performedBy, details });
            await timestamp.save();
        } catch (error) {
            console.error('Error logging timestamp:', error);
        }
    }
}

module.exports = new TimestampService();
