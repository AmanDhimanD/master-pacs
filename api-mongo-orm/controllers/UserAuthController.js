// controllers/userController.js
const userModel = require('../models/UserAuthModel.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

async function registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: 'Email is already registered' });
        }

        // Create a new user instance
        const newUser = new userModel({
            name,
            email,
            password,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Optionally, you can generate and send a JWT token for successful registration
        // const token = generateToken(savedUser._id); // Implement this function to generate a token

        // Return the saved user or token in the response
        res.json(savedUser);
    } catch (e) {
        res.status(500).send('Something Went Wrong');
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // Find the user in the database based on the provided email
        const user = await userModel.findOne({ email });

        if (!user) {
            // If the user is not found, return a 404 Not Found status
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            // If the password is invalid, return a 401 Unauthorized status
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate and send a JWT token for successful login
        const token = jwt.sign({ userId: user._id }, 'demo');
        res.json({ token });
    } catch (error) {
        // If any error occurs during the login process, log the error for debugging purposes
        console.error('Error during login:', error);
        res.status(500).send('Something Went Wrong');
    }
}



async function getAllUsers(req, res) {
    const authHeader = req.header('Authorization');

    // Check if Authorization header is missing or doesn't contain a valid token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return await res.status(401).json({ error: 'Unauthorized. Please log in first.' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
        const users = await userModel.find();
        res.json({ users });
    } catch (e) {
        await res.status(500).send('Something Went Wrong');
    }
}



async function logoutUser(req, res) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(400).json({ error: 'Invalid token' });
    }
    res.json({ message: 'Logout successful' });
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    logoutUser
};
