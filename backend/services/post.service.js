// src/services/post.service.js
const Post = require('../models/post.model');
exports.createPost = async (data) => {
  const post = new Post(data);
  return post.save();
};

// Thêm hoặc cập nhật reaction
exports.reactToPost = async (postId, userId, type) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');
  
    const existingReaction = post.reactions.find(
      (r) => r.user.toString() === userId
    );
  
    if (existingReaction) {
      existingReaction.type = type; // Cập nhật kiểu cảm xúc
    } else {
      post.reactions.push({ user: userId, type }); // Thêm mới
    }
  
    return await post.save();
  };
  
  // Chia sẻ bài viết
  exports.sharePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');
  
    if (!post.shares.includes(userId)) {
      post.shares.push(userId);
    }
  
    return await post.save();
  };
  
  // Lấy thông tin chi tiết của bài viết
  exports.getPostDetails = async (postId) => {
    return await Post.findById(postId)
      .populate('author', 'username')
      .populate('reactions.user', 'username')
      .populate('shares', 'username');
  };


  exports.getUserPosts = async (userId) => {
    // Lấy bài viết do người dùng tạo
    const createdPosts = await Post.find({ author: userId })
    .select('title content reactions') // Chỉ lấy 3 trường cần thiết
    .sort({ createdAt: -1 }); // Sắp xếp từ mới nhất
  
     // Lấy bài viết chia sẻ từ người khác
     const sharedPosts = await Post.find({
        shares: userId,
        author: { $ne: userId } // Lọc bỏ bài viết tự chia sẻ
      })
        .select('title content reactions ') // Chỉ lấy title, content, reactions, loại bỏ author và shares
        .sort({ updatedAt: -1 });
      

    return {
      createdPosts,
      sharedPosts
    };
  };