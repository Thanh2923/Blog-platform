// src/controllers/post.controller.js
const postService = require('../services/post.service');


const postControllers = {
 createPost : async (req, res) => {
    const userId = req.user.id;
    try {
      const post = await postService.createPost({ ...req.body ,author:userId });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
 reactToPost : async (req, res) => {
    const { postId } = req.params;
    const {  type } = req.body;
    const userId = req.user.id;
  
    try {
      const post = await postService.reactToPost(postId, userId, type);
      res.json({ message: 'Reaction updated', post });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
 sharePost : async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
  
    try {
      const post = await postService.sharePost(postId, userId);
      res.json({ message: 'Post shared successfully', post });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Lấy thông tin chi tiết bài viết
 getPostDetails : async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await postService.getPostDetails(postId);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

   getUserPosts : async (req, res) => {
    const  userId  = req.user.id;
  
    try {
      const userPosts = await postService.getUserPosts(userId);
      res.json(userPosts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
}

module.exports = postControllers