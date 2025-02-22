// src/controllers/user.controller.js
const userService = require('../services/user.service');


const userControllers = {
  register : async (req, res) => {
    try {
      const user = await userService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  login : async (req, res) => {
    try {
      const { token, user } = await userService.login(req.body.email, req.body.password);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
}

module.exports = userControllers