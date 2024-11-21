const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const timestampService = require('../services/timestampService'); // Import the timestamp service

class UserService {
    // Create a user
    async createUser(userData) {
        try {
            if (!userData.password) {
                throw new Error('Password is required');
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            const userWithHashedPassword = {
                ...userData,
                password: hashedPassword,
            };
            const user = await userRepository.createUser(userWithHashedPassword);

            // Update timestamp for Users collection
            await timestampService.updateTimestamp("Users");

            return user;
        } catch (error) {
            console.error('Error saving user:', error.message);
            throw error;
        }
    }

    // Get all the users
    async getAllUsers() {
        return await userRepository.findAllUsers();
    }

    // Get a user by their id
    async getUserById(userId) {
        return await userRepository.findUserById(userId);
    }

    // Update a user
    async updateUser(userId, updateData) {
        const updatedUser = await userRepository.updateUserById(userId, updateData);
        if (!updatedUser) {
            throw new Error("User not found");
        }

        // Update timestamp for Users collection
        await timestampService.updateTimestamp("Users");

        return updatedUser;
    }

    // Delete a user
    async deleteUser(userId) {
        const deletedUser = await userRepository.deleteUserById(userId);
        if (!deletedUser) {
            throw new Error("User not found");
        }

        // Update timestamp for Users collection
        await timestampService.updateTimestamp("Users");

        return deletedUser;
    }

    // Update user status
    async updateUserStatus(userId, status) {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const updatedUser = await userRepository.updateUserById(userId, { active: status });
        if (!updatedUser) {
            throw new Error("User not found");
        }

        // Update timestamp for Users collection
        await timestampService.updateTimestamp("Users");

        return updatedUser;
    }
}

module.exports = new UserService();
