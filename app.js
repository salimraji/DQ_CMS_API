const express = require('express');
const cors = require('cors');
const authenticateToken = require('./middlewares/authMiddleware');
const pageRoutes = require('./routes/pageRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const labelRoutes = require('./routes/labelRoutes');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use('/api/users', userRoutes);


app.use(authenticateToken);


app.use('/api/news', newsRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/labels', labelRoutes);

module.exports = app;
