const userService = require('../services/userService');
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const authService = require('../services/authService')
class UserController {
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = authService.generateToken(user);
            return res.status(200).json({ token, userId: user._id, role: user.role, active: user.active });
        } catch (error) {
            return res.status(500).json({ message: 'An error occurred during login', error: error.message });
        }
    }
    async toggleUserStatus(req, res) {
        try {
          const { userId } = req.params;
      
          const user = await userService.getUserById(userId);
          if (!user) {
            throw new Error("User not found");
          }
      
          const newStatus = !user.active; 
          const updatedUser = await userService.updateUserStatus(userId, newStatus);
      
          res.status(200).json({ 
            message: `User ${newStatus ? "activated" : "deactivated"} successfully`, 
            user: updatedUser 
          });
        } catch (error) {
          console.error("Error toggling user status:", error);
          const status = error.message === "User not found" ? 404 : 500;
          res.status(status).json({ message: error.message });
        }
      }
      
}

module.exports = new UserController();
