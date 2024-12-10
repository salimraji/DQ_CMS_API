const deviceService = require('../services/deviceService');
const Device = require('../models/deviceModel')

class DeviceController {
    async registerDevice(req, res) {
        try{
            const device = await deviceService.registerDevice(req.body);
            res.status(201).json(device)
        }catch (error){
            res.status(400).json({ message: error.message });
        }
    }


}

module.exports = new DeviceController();