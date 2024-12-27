const express = require('express');
const app = express();  // اینجا اپلیکیشن تعریف می‌شود
const mongoose = require('mongoose');
const donationRoutes = require('./routes/donationRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// اتصال به دیتابیس MongoDB
mongoose.connect('mongodb://localhost:27017/charity_donations', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// مسیرهای API
app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);

// راه‌اندازی سرور
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
