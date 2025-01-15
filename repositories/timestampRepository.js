const Timestamp = require("../models/timestampModel");


const updateTimestamp = async (collectionName) => {
  const currentTimestamp = new Date();
  await Timestamp.updateOne(
    { _id: collectionName },
    { $set: { lastUpdated: currentTimestamp } },
    { upsert: true }
  );


};

const getAllTimestamps = async () => {
  return await Timestamp.find({});
};

module.exports = {
  updateTimestamp,
  getAllTimestamps,
};
