const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserAuthModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Password hashing before saving to the database
UserAuthModel.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
});

// Method to compare hashed password during login
UserAuthModel.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error(err);
    }
};

const User = mongoose.model('UsersAuth', UserAuthModel);

module.exports = User;
