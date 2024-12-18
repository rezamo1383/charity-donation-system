const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const donationRoutes = require('./routes/donationRoutes');

dotenv.config();

// اتصال به پایگاه داده
connectDB();

const app = express();

// Middleware
app.use(express.json());

// مسیرها
app.use('/api/donations', donationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
