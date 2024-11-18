const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');

// Route to create a new label
router.post('/', labelController.createLabel);

// Route to get all labels with pagination and search
router.get('/', labelController.getLabels); // Updated to include pagination and search

// Route to get a label by ID
router.get('/:id', labelController.getLabelById);

// Route to update a label by ID
router.put('/:id', labelController.updateLabel);

// Route to delete a label by ID
router.delete('/:id', labelController.deleteLabel);

module.exports = router;
