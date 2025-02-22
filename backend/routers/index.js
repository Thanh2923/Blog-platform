// src/routers/index.js
const express = require('express');
const commentRoutes = require('./comment.router');
const postRoutes = require('./post.router');
const userRoutes = require('./user.router');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// Định nghĩa route chính xác
router.use('/users', userRoutes); // Không cần xác thực
router.use('/posts', authMiddleware.verifyToken, postRoutes); // Cần xác thực
router.use('/comments', authMiddleware.verifyToken, commentRoutes); // Cần xác thực

module.exports = router;
