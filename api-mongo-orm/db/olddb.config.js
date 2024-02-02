require('dotenv').config()
const mongoose = require('mongoose');


mongoose.set('strictQuery', false)

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB ${mongoose.connection.host}`);
    } catch (err) {
        console.error('Error connecting to DB:', err);
    }
}

module.exports = connectToDatabase;
