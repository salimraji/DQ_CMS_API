const timestampRepository = require('../repositories/timestamprepository.js')

const updateTimestamp = async (collectionName) => {
  await timestampRepository.updateTimestamp(collectionName);
};

const getAllTimestamps = async () => {
  return await timestampRepository.getAllTimestamps();
};

module.exports = {
  updateTimestamp,
  getAllTimestamps,
};
