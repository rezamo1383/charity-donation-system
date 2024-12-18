const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// دریافت تمام کمک‌ها
router.get('/', donationController.getDonations);

// ایجاد کمک مالی جدید
router.post('/', donationController.createDonation);

module.exports = router;
