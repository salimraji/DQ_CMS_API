const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

class UserService {

    //Create a user
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
            return await userRepository.createUser(userWithHashedPassword);
        } catch (error) {
            console.error('Error saving user:', error.message);
            throw error; 
        }
    }
    //Get all the users
    async getAllUsers(){
        return await userRepository.findAllUsers();
    };

    //Get a user by their id
    async getUserById(userId){
        return await userRepository.findUserById(userId);
    };
    
    //Update a user
    async updateUser(userId, updateData){
        return await userRepository.updateUserById(userId, updateData);
    };

    //Delete a user
    async deleteUser(userId){
        return await userRepository.deleteUserById(userId);
    };

    async updateUserStatus(userId, status) {
        if (!userId) {
          throw new Error("User ID is required");
        }
      
        const updatedUser = await userRepository.updateUserById(userId, { active: status });
      
        if (!updatedUser) {
          throw new Error("User not found");
        }
      
        return updatedUser;
      }
      
    
  }
  
  module.exports = new UserService();