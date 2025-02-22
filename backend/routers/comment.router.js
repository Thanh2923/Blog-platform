// src/routers/comment.router.js
const express = require('express');
const commentRoutes = require('../controllers/comment.controller');
const router = express.Router();

router.post('/', commentRoutes.createComment);

module.exports = router;