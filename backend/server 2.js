require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./database/db');

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection check
pool.getConnection()
    .then(connection => {
        console.log('✅ Database connected successfully');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Error Handling block
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
