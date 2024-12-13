const deviceRepository = require('../repositories/deviceRepository');

class DeviceService {
    async registerDevice(deviceData) {
        const { uuid } = deviceData;
        
        let existingDevice = await deviceRepository.findDeviceByDeviceId(uuid);

        if (existingDevice) {
            return await deviceRepository.updateDeviceByDeviceId(uuid, deviceData);
        }

        return await deviceRepository.registerDevice(deviceData);
    }
}

module.exports = new DeviceService();
