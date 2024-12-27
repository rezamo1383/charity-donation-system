const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const signinController = require('../controllers/signinController');
const User = require('../models/UserModel'); 
const Donation = require('../models/DonationModel');

// مسیر برای ثبت‌نام
router.post('/signup', signupController.handleSignUp);

// مسیر برای ورود
router.post('/signin', signinController.handleSignIn);

// مسیر برای دریافت اطلاعات کاربر
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching user data' });
  }
});

// مسیر برای دریافت تاریخچه اهدایی‌ها
router.get('/users/:id/donations', async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.params.id }).sort({ date: -1 });
    res.json({ success: true, donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching donation history' });
  }
});

// مسیر برای ثبت اهدا
router.post('/users/:id/donations', async (req, res) => {
  try {
    const { amount, message } = req.body;
    const donation = new Donation({
      userId: req.params.id,
      amount,
      message,
      date: new Date(),
    });
    await donation.save();
    res.json({ success: true, donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error processing donation' });
  }
});

module.exports = router;
