const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');

router.post('/', labelController.createLabel);
router.get('/', labelController.getLabels); 
router.get('/:id', labelController.getLabelById);
router.put('/:id', labelController.updateLabel);
router.delete('/:id', labelController.deleteLabel);

module.exports = router;
