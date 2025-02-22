// src/models/schemas/comment.schema.js
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
}, { timestamps: true });
module.exports = commentSchema;