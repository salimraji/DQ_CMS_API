const mappUserService = require('../services/mappUserService.js');

class MAppUserController {
    async linkToMobile(req, res) {
        try {
            const { id, deviceId } = req.body;

            if (!id || !deviceId) {
                return res.status(400).json({ message: 'userId and deviceId are required' });
            }

            const result = await mappUserService.linkToMobile(id, deviceId);

            return res.status(200).json({ message: result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async setUserInfo(req, res) {
        try {
            const { id, settings } = req.body;

            if (!id || !settings) {
                return res.status(400).json({ message: 'userId and settings are required' });
            }

            const result = await mappUserService.setUserInfo(id, settings);

            return res.status(200).json({ message: result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new MAppUserController();

