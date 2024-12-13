const Device = require('../models/deviceModel');

class DeviceRepository {
    async registerDevice(data) {
        return new Device(data).save();
    }

    async findAllDevices() {
        return Device.find();
    }

    async findDeviceByDeviceId(uuid) { 
        return Device.findOne({ uuid });
    }

    async updateDeviceByDeviceId(uuid, updatedData) {
        return Device.findOneAndUpdate(
            { uuid },
            updatedData,
            { new: true, upsert: false }
        );
    }
}

module.exports = new DeviceRepository();
