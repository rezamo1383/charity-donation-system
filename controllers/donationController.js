const Donation = require('../models/donation');

// ایجاد کمک مالی جدید
const createDonation = async (req, res) => {
  try {
    const { donorName, amount, message } = req.body;
    const newDonation = new Donation({
      donorName,
      amount,
      message
    });
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// دریافت تمام کمک‌ها
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createDonation,
  getDonations
};
