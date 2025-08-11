const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/aplikasi_polda');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
};

connectDB();

app.use(cors());
app.use(express.json());

// Root route - WAJIB ADA!
app.get('/', (req, res) => {
  res.json({
    message: 'Aplikasi Polda Backend is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes (comment dulu sampai fix)
app.use('/api/laporan', require('./LaporanRoutes'));

const PORT = process.env.PORT || 5000;

// SELALU LISTEN - jangan pakai conditional!
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;


