const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/auth/login', userController.loginUser); 
router.post('/', userController.createUser); 

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.patch('/:userId/toggleStatus', userController.toggleUserStatus);

module.exports = router;
