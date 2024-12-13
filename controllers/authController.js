const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const authService = require('../services/authService');

class AuthController {
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
}

module.exports = new AuthController();
