const { Server } = require("socket.io");
const ConnectedDevice = require('./models/connectedDeviceModel.js');

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected.');

        socket.on('login', ({ userID, deviceID }) => {
            console.log('Login event received');
            console.log('User ID:', userID);
            console.log('Device ID:', deviceID);

            ConnectedDevice.findOne({ userId: userID, deviceId: deviceID })
                .then(existingDevice => {
                    if (existingDevice) {
                        console.log('Device already registered');
                        return;
                    }

                    const newDevice = new ConnectedDevice({
                        userId: userID,
                        deviceId: deviceID,
                    });

                    newDevice.save()
                        .then(() => console.log('Device info saved'))
                        .catch(err => console.error('Error saving device info:', err));
                })
                .catch(err => console.error('Error checking for existing device:', err));
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected.');
            const userID = socket.handshake.query.userID;
            const deviceID = socket.handshake.query.deviceID;

            if (userID && deviceID) {
                ConnectedDevice.deleteOne({ userId: userID, deviceId: deviceID })
                    .then(() => console.log(`Device info for user ${userID} deleted`))
                    .catch(err => console.error(`Error deleting device info for user ${userID}:`, err));
            }
        });
    });
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized. Please call initializeSocket first.");
    }
    return io;
};

module.exports = { initializeSocket, getIO };
