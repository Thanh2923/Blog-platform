// src/routers/post.router.js
const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();
router.post('/', postController.createPost); // Like, Heart...
router.post('/:postId/react', postController.reactToPost); // Like, Heart...
router.post('/:postId/share', postController.sharePost);    // Chia sẻ bài viết
router.get('/:postId', postController.getPostDetails);      // Lấy thông tin chi tiết
router.get('/', postController.getUserPosts);
module.exports = router;
