const Donation = require('../models/donation'); // مدل مرتبط با MongoDB

// دریافت تمام کمک‌ها
exports.getDonations = async (req, res) => {
    try {
        const donations = await Donation.find(); // دریافت تمام داده‌ها از MongoDB
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: 'خطا در دریافت کمک‌ها' });
    }
};

// ایجاد کمک مالی جدید
exports.createDonation = async (req, res) => {
    try {
        const { donorName, amount, message } = req.body;

        // اعتبارسنجی داده‌ها
        if (!donorName || !amount) {
            return res.status(400).json({ error: 'نام و مبلغ الزامی هستند' });
        }

        // ایجاد یک کمک مالی جدید
        const newDonation = new Donation({
            donorName,
            amount,
            message,
            date: new Date(),
        });

        // ذخیره در پایگاه داده
        await newDonation.save();

        res.status(201).json(newDonation); // ارسال پاسخ با داده‌های ایجاد شده
    } catch (error) {
        res.status(500).json({ error: 'خطا در ایجاد کمک مالی' });
    }
};
