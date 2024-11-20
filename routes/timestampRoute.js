const express = require('express');
const router = express.Router();
const timestampController = require('../controllers/timestampController');

router.get('/', timestampController.getLogs);

module.exports = router;
