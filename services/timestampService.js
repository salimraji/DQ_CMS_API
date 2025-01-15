const timestampRepository = require('../repositories/timestamprepository.js');
const { getIO } = require('../socket');

const updateTimestamp = async (collectionName) => {
    try {
        await timestampRepository.updateTimestamp(collectionName);
        const io = getIO();
        io.emit('timestampUpdated', { collectionName, timestamp: new Date().toISOString() });

        console.log(`Timestamp updated for collection: ${collectionName}`);
    } catch (error) {
        console.error('Error updating timestamp:', error);
        throw error;
    }
};

const getAllTimestamps = async () => {
    try {
        return await timestampRepository.getAllTimestamps();
    } catch (error) {
        console.error('Error fetching all timestamps:', error);
        throw error; 
    }
};

module.exports = {
    updateTimestamp,
    getAllTimestamps,
};
