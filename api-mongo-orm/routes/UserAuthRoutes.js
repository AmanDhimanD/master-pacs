// routes/usersRoutes.js
const express = require('express');
const router = express.Router();

const userAuthController = require('../controllers/UserAuthController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// User registration route
router.post('/register', userAuthController.registerUser);

// User login route
router.post('/login', userAuthController.loginUser);

// Get all users route (example route)
router.get('/all',  userAuthController.getAllUsers);

router.post('/logout', authMiddleware, userAuthController.logoutUser);

module.exports = router;
