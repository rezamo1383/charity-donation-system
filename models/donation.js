const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String }
});

module.exports = mongoose.model('Donation', donationSchema);
