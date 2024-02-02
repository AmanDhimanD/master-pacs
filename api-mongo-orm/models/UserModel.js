const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;
