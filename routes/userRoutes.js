const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/auth/login', userController.loginUser); // Public route
router.post('/', userController.createUser); // Public route (Signup)

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:userId/toggleStatus', userController.toggleUserStatus);

module.exports = router;
