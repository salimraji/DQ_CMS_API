const userRepository = require('../repositories/userRepository');


class UserService {

    //Create a user
    async createUser(userData) {
        return await userRepository.createUser(userData);
    };
    
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
    
  }
  
  module.exports = new UserService();