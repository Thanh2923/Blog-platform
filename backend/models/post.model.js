// src/models/post.model.js
const mongoose = require('mongoose');
const postSchema = require('./schemas/post.schema');
module.exports = mongoose.model('Post', postSchema);
