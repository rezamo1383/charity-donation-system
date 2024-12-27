const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  message: { type: String, default: '' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', DonationSchema);
