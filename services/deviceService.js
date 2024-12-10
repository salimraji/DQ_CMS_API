const deviceRepository = require('../repositories/deviceRepository');

class DeviceService {
    async registerDevice(deviceData) {
        const { id } = deviceData;
        
        let existingDevice = await deviceRepository.findDeviceByDeviceId(id);

        if (existingDevice) {
            return await deviceRepository.updateDeviceByDeviceId(id, deviceData);
        }

        return await deviceRepository.registerDevice(deviceData);
    }
}

module.exports = new DeviceService();
