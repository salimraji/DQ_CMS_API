const express = require('express');
const router = express.Router();
const timestampController = require('../controllers/timestampController');

router.get("/", timestampController.getAllTimestamps);
router.post("/:collectionName", timestampController.updateTimestamp);;

module.exports = router;
