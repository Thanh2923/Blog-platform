
// src/services/comment.service.js
const Comment = require('../models/comment.model');
exports.createComment = async (data) => {
  const comment = new Comment(data);
  return comment.save();
};