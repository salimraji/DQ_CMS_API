const express = require('express');
const cors = require('cors');
const authenticateToken = require('./middlewares/authMiddleware');
const pageRoutes = require('./routes/pageRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const labelRoutes = require('./routes/labelRoutes');
const timestampRoutes = require('./routes/timestampRoutes.js')
const mappUserRoutes = require('./routes/mappUserRoutes.js')
const deviceRoutes = require('./routes/deviceRoutes')
const authRoutes = require('./routes/authRoutes.js')
const path = require('path');
const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));



app.use('/api/auth', authRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(authenticateToken);
app.use('/api/users', userRoutes);
app.use('/api/mappUser', mappUserRoutes);
app.use('/api/device', deviceRoutes)
app.use('/api/news', newsRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/labels', labelRoutes);
app.use("/timestamps", timestampRoutes);

module.exports = app;
