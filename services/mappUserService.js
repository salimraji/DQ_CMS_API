const mappUserRepository = require('../repositories/mappUserRepository')

class MAppUserService {
    async linkToMobile(id, deviceId) {
        const user = await mappUserRepository.findByUserId(id);

        if (user) {
            if (user.deviceIds.includes(deviceId)) {
                return 'Device is already linked to the user';
            }
            user.deviceIds.push(deviceId);
            await mappUserRepository.updateUserDevices(id, user.deviceIds);
            return 'Device successfully linked to the user';
        }
        await mappUserRepository.createUser(id, deviceId);
        return 'User created and device successfully linked';
    }

    async setUserInfo(id, settings) {
        const user = await mappUserRepository.findByUserId(id);

        if (!user) {
            throw new Error('User not found');
        }

        const updatedSettings = { ...user.settings, ...settings }; 
        await mappUserRepository.updateUserSettings(id, updatedSettings);

        return 'User settings updated successfully';
    }
}

module.exports = new MAppUserService();
