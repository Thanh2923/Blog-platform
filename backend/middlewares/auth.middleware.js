const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

  const authMiddleware = {
    verifyToken : async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header
      
        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }
      
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await User.findById(decoded.id).select('-password');
          next();
        } catch (error) {
          res.status(401).json({ message: 'Invalid token' });
        }
      },
  }


  module.exports = authMiddleware



