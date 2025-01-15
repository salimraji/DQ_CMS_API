const timestampService = require("../services/timestampService");
const io = require('../app')

const updateTimestamp = async (req, res) => {
  const { collectionName } = req.params;

  if (!["Labels", "Users", "Pages", "News"].includes(collectionName)) {
    return res.status(400).json({ error: "Invalid collection name" });
  }
  
  await timestampService.updateTimestamp(collectionName);
  console.log('Emitting...')
  io.emit('timestampUpdated', {
    collectionName,
    message: `Timestamp updated for ${collectionName}`,
  });

  res.json({ message: `Timestamp updated for ${collectionName}` });
};

const getAllTimestamps = async (req, res) => {
  const timestamps = await timestampService.getAllTimestamps();
  res.json(timestamps);
};

module.exports = {
  updateTimestamp,
  getAllTimestamps,
};
