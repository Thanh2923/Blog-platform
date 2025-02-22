
// src/routers/user.router.js
const express = require('express');
const  userRoutes = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', userRoutes.register);
router.post('/login', userRoutes.login);

module.exports = router;