const userModel = require('../models/UserModel.js');

async function getUser(req, res) {
    try {
        const users = await userModel.find(); // Retrieve all users from the database
        res.json({ users });
    } catch (e) {
        res.status(500).send('Something Went Wrong');
    }
}

async function registerUser(req, res) {
    try {
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
        });

        const result = await user.save();
        res.json(result);
    } catch (e) {
        res.status(500).send('Something Went Wrong');
    }
}

module.exports = {
    registerUser,
    getUser
};
