
const express = require('express');
const router = express.Router();
const Donation = require('../models/DonationModel'); // مدل Donation را وارد کنید

// مسیر برای دریافت لیست اهدای‌ها
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json({ success: true, donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching donations' });
  }
});

// مسیر برای ایجاد یک اهدا
router.post('/', async (req, res) => {
  const { userId, amount, description } = req.body;

  try {
    const newDonation = new Donation({ userId, amount, description });
    await newDonation.save();
    res.status(201).json({ success: true, message: 'Donation created', donation: newDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating donation' });
  }
});

module.exports = router;
