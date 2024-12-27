
const mongoose = require('mongoose');

const recurringDonationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  charityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity', required: true },
  amount: { type: Number, required: true },
  interval: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  nextDonationDate: { type: Date, required: true },
});

module.exports = mongoose.model('RecurringDonation', recurringDonationSchema);
