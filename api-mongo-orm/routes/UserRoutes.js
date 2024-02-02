// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.get('/',userController.getUser)
router.post('/register', userController.registerUser);

module.exports = router;
