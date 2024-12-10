const User = require('../models/userModel');

class UserRepository {
    createUser(userData) {
        const user = new User(userData);
        return user.save();
    }

    findAllUsers() {
        return User.find();
    }

    findUserById(userId) {
        return User.findById(userId);
    }

    updateUserById(userId, updateData) {
        return User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    }

    deleteUserById(userId) {
        return User.findByIdAndDelete(userId);
    }
}

module.exports = new UserRepository();
