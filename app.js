const express = require('express');
const pageRoutes = require('./routes/pageRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const labelRoutes = require('./routes/labelRoutes');
const cors = require('cors');



const app = express();

app.use(express.json());

app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin to access
    methods: ['GET', 'POST'], // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
    credentials: true, // if your site includes cookies or other credentials
  }));



app.use('/api/news', newsRoutes)
app.use('/api/pages', pageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/labels', labelRoutes);


module.exports = app;
