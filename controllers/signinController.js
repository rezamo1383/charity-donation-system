const User = require('../models/UserModel');

exports.handleSignIn = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found. Please sign up.' });
    }

    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error signing in' });
  }
};
