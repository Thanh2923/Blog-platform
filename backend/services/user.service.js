// src/services/user.service.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({ ...data, password: hashedPassword });
  return user.save();
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
   // Tạo Refresh Token (7 ngày)
   const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );

  user.refreshToken = refreshToken;
  await user.save();
  return { token, user };
};

exports.getRefreshToken = async (userId) => {
  const user = await User.findById(userId).select('refreshToken');
  if (!user) {
    throw new Error('User not found');
  }
  return user.refreshToken;
};
