const Donation = require('../models/donation');

exports.createDonation = async (req, res) => {
  try {
    const { donorName, amount, message } = req.body;
    const donation = new Donation({ donorName, amount, message });

    await donation.save();
    res.status(201).json({ message: 'Donation created successfully!', donation });
  } catch (err) {
    res.status(500).json({ message: 'Error creating donation', error: err });
  }
};
