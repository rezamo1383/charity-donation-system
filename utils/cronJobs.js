const cron = require('node-cron');
const RecurringDonation = require('../models/RecurringDonation');
const Donation = require('../models/DonationModel');

cron.schedule('0 0 * * *', async () => { // اجرا هر شب ساعت ۱۲
  const today = new Date();
  const recurringDonations = await RecurringDonation.find({ nextDonationDate: { $lte: today } });

  for (const donation of recurringDonations) {
    // ایجاد کمک مالی
    await Donation.create({
      userId: donation.userId,
      charityId: donation.charityId,
      amount: donation.amount,
      date: new Date(),
    });

    // به‌روزرسانی تاریخ بعدی
    const nextDate = calculateNextDate(donation.nextDonationDate, donation.interval);
    donation.nextDonationDate = nextDate;
    await donation.save();
  }
});

function calculateNextDate(currentDate, interval) {
  const date = new Date(currentDate);
  if (interval === 'daily') date.setDate(date.getDate() + 1);
  if (interval === 'weekly') date.setDate(date.getDate() + 7);
  if (interval === 'monthly') date.setMonth(date.getMonth() + 1);
  return date;
}
