const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = {
  // Xác thực Access Token
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
   console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  },

  // Xác thực Refresh Token
  verifyRefreshToken: async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(403).json({ message: 'Invalid refresh token' });
    }
  },

  // Phân quyền (Role-based Access Control)
  authorizeRoles: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
      }
      next();
    };
  }
};

module.exports = authMiddleware;
