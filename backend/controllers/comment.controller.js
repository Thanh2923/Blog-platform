// src/controllers/comment.controller.js
const commentService = require('../services/comment.service');
 

const commentControllers = {
  createComment : async (req, res) => {
    try {
      const comment = await commentService.createComment({ ...req.body, author: req.user.id });
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
}

module.exports = commentControllers