const mongoose = require('mongoose');
const { app, server } = require('./app');

const HOST = '192.168.12.113';
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/cms';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
