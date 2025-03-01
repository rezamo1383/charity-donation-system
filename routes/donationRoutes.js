const express = require('express');
const router = express.Router();
const Donation = require('../models/DonationModel');
const RecurringDonation = require('../models/RecurringDonation');

// ایجاد کمک مالی جدید
router.post('/', async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json({ success: true, donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating donation' });
  }
});

// دریافت لیست کمک‌های مالی
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json({ success: true, donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching donations' });
  }
});

// ایجاد کمک مالی مکرر
router.post('/recurring', async (req, res) => {
  try {
    const recurringDonation = await RecurringDonation.create(req.body);
    res.status(201).json({ success: true, recurringDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating recurring donation' });
  }
});

module.exports = router;
