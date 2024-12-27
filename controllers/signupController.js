const User = require('../models/UserModel');

exports.handleSignUp = async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  try {
    const newUser = new User({
      fullName,
      email,
      phone,
      password,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error signing up' });
  }
};
