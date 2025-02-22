// src/models/schemas/post.schema.js
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['like', 'heart', 'laugh', 'sad', 'angry'], required: true }
}, { _id: false });

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reactions: [reactionSchema], // Lưu các tương tác (like, heart, ...)
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Người đã chia sẻ bài viết
}, { timestamps: true });

module.exports = postSchema;
