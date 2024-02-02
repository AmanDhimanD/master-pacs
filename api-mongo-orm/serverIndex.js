// index.js
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()
const app = express();
// MongoDB setup
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_APP_SECRET,
});

// Define the image upload storage
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Define the MongoDB Schema and Model for saving data
const imageDataSchema = new mongoose.Schema({
    url: String,
});

const ImageData = mongoose.model("ImageData", imageDataSchema);

// Route for uploading images to Cloudinary and saving data in MongoDB
app.post("/upload", upload.array("image", 5), async (req, res) => {
    try {
        // Check if any files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No image files provided.' });
        }

        const uploadedImagesData = [];

        // Upload each image to Cloudinary and save image data in MongoDB
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            // const imageData = new ImageData({
            //     url: result.secure_url,
            // });

            console.log(result.secure_url);
            uploadedImagesData.push(result.secure_url);
        }

        res.json({ message: "Images uploaded successfully!", data: uploadedImagesData });

    } catch (err) {
        console.error("Error uploading images:", err);
        res.status(500).json({ error: "Failed to upload images." });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
