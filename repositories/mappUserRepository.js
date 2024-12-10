const MAppUser = require ('../models/mappUserModel')

class MAppUserRepository {
    async findByUserId(id) {
        return await MAppUser.findOne({ id });
    }

    async updateUserDevices(id, deviceIds) {
        return await MAppUser.updateOne({ id }, { $set: { deviceIds } });
    }

    async createUser(id, deviceId) {
        const newUser = new MAppUser({
            id,
            deviceIds: [deviceId]
        });
        return await newUser.save();
    }

    async updateUserSettings(id, settings) {
        return await MAppUser.updateOne(
            { id },
            { $set: { settings: settings } }
        );
    }
    
}

module.exports = new MAppUserRepository();
