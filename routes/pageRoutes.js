const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.get('/aboutUs', pageController.getAboutUs)
router.get('/', pageController.getPages);
router.get('/all', pageController.getAllPages);
router.post('/', pageController.createPage);
router.get('/:id', pageController.getPageById);
router.put('/:id', pageController.updatePage);
router.delete('/:id', pageController.deletePage);
router.get('/type/:type', pageController.getPageByType);
router.delete('/:pageId/content/:contentId', pageController.deleteContentItem);
router.post('/:pageId/content', pageController.addContentToPage);
router.put('/:pageId/content/:contentId', pageController.editContentInPage);
router.post('/:pageId/add-detail', pageController.addDetail);
router.delete('/:pageId/details', pageController.deleteDetailByValue);
router.patch('/:pageId/details', pageController.updateDetail);

module.exports = router;
