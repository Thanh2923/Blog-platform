
// src/routers/user.router.js
const express = require('express');
const  userRoutes = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();

router.post('/register', userRoutes.register);
router.post('/login', userRoutes.login);
router.post('/refreshToken', authMiddleware.verifyRefreshToken);

module.exports = router;