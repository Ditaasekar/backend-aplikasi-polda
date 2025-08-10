const express = require('express');
const connectDB = require('./db');
require('dotenv').config();
const cors = require('cors');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Basic route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Backend Aplikasi Polda is running!' });
});

// Routes
app.use('/api/laporan', require('./routes/laporanRoutes'));

const PORT = process.env.PORT || 5000;

// Always listen regardless of environment
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

