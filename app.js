const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');
const authenticateToken = require('./middlewares/authMiddleware');
const pageRoutes = require('./routes/pageRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const labelRoutes = require('./routes/labelRoutes');
const timestampRoutes = require('./routes/timestampRoutes.js');
const mappUserRoutes = require('./routes/mappUserRoutes.js');
const deviceRoutes = require('./routes/deviceRoutes');
const authRoutes = require('./routes/authRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes');
const sentNotificationRoutes = require('./routes/sentNotificationRoute.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// Middleware and routes setup
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(authenticateToken);
app.use('/api/users', userRoutes);
app.use('/api/mappUser', mappUserRoutes);
app.use('/api/device', deviceRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/labels', labelRoutes);
app.use("/timestamps", timestampRoutes);
app.use("/api/timestamps", timestampRoutes);
app.use('/api/send-notification', notificationRoutes);
app.use('/api/sentNotifications', sentNotificationRoutes);

const ConnectedDevice = require('./models/connectedDeviceModel.js');
const sentNotificationRepository = require('./repositories/sentNotificationRepository.js')

app.post('/api/socket-notification', async (req, res) => {
    const { key, type, message, userId } = req.body;

    if (!userId || !key || !type || !message) {
        return res.status(400).send('Missing key, type, or message in request');
    }

    try {
        const notificationData = {
            userId: userId,
            message: message,
            dateReceived: new Date().toISOString(),  
            isSeen: false  
        };

        await sentNotificationRepository.saveSentNotification(notificationData);

        io.emit('notification', { key, type, message, userId });

        res.send({ status: 'Notification sent and saved' });
    } catch (error) {
        console.error('Error saving notification:', error);
        res.status(500).send('Failed to save notification');
    }
});

// Socket Connection Event
io.on('connection', (socket) => {
    const userID = socket.handshake.query.userID;
    const deviceID = socket.handshake.query.deviceID;
    console.log('A user connected with ID: ', userID);
    console.log('device ID: ', deviceID);

    const newDevice = new ConnectedDevice({
        userId: userID,
        deviceId: deviceID
    });

    newDevice.save()
        .then(() => console.log('Device info saved'))
        .catch(err => console.error('Error saving device info:', err));

    socket.on('disconnect', () => {
        console.log(`User ${userID} disconnected`);

        ConnectedDevice.deleteOne({ userId: userID })
            .then(() => console.log(`Device info for user ${userID} deleted`))
            .catch(err => console.error(`Error deleting device info for user ${userID}:`, err));
    });

});

module.exports = { app, server };
