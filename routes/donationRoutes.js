const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController'); // اطمینان از وارد کردن درست کنترلر

// دریافت تمام کمک‌ها
router.get('/', donationController.getDonations);  // اطمینان از فراخوانی درست متد

// ایجاد کمک مالی جدید
router.post('/', donationController.createDonation);

module.exports = router;

