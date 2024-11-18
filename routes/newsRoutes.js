const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.post('/', newsController.createNews);    
router.get('/', newsController.getNews);        
router.get('/:id', newsController.getNewsById); 
router.put('/:id', newsController.updateNews);    
router.delete('/:id', newsController.deleteNews);  

module.exports = router;
