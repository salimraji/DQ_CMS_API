const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/', userController.createUser); 
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:userId/toggleStatus', userController.toggleUserStatus);

module.exports = router;
