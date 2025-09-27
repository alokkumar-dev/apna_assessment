const User = require('../models/User');
const generateToken = require('../utills/generateToken');

// Register
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ fullName, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      progress: user.progress,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Logout
exports.logoutUser = (req, res) => {
  res.clearCookie('token'); // Assuming token is stored in a cookie
  res.status(200).json({ message: 'Logged out successfully' });
};