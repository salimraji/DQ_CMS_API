const Device = require('../models/deviceModel');

class DeviceRepository {
    async registerDevice(data) {
        return new Device(data).save();
    }

    async findAllDevices() {
        return Device.find();
    }

    async findDeviceByDeviceId(id) { 
        return Device.findOne({ id });
    }

    async updateDeviceByDeviceId(id, updatedData) {
        return Device.findOneAndUpdate(
            { id },
            updatedData,
            { new: true, upsert: false }
        );
    }
}

module.exports = new DeviceRepository();
