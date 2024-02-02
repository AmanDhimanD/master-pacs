// controllers/imageController.js
const Image = require('../../models/imageModels/ImageModel.js');
const multer = require('multer');
const dotenv = require("dotenv");
const mime = require('mime')
const patientMod = require('../../models/patientsModels/PatientsModel.js')
const Study = require('../../models/studyModels/StudyModel.js')
const Series = require('../../models/seriesModels/SeriesModel.js')


dotenv.config()
const cloudinaryVar = require("cloudinary").v2;
cloudinaryVar.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_APP_SECRET,
});


// Define the image upload storage
const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'uploads/');
    // },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit, change as needed
});

//Old api
// // POST /api/images/uploads : Upload and save multiple images
async function uploadImages(req, res) {
    try {
        // Check if any files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No image files provided.' });
        }

        const uploadedImagesData = [];

        //Upload each image to Cloudinary and save image data in MongoDB
        for (const file of req.files) {
            const result = await cloudinaryVar.uploader.upload(file.path, {
                use_filename: true,
                unique_filename: false, resource_type: "raw", max_file_size: 10000000, // 10 MB in bytes (10 * 1024 * 1024 bytes)
            },
                (error, result) => {
                    if (error) {
                        console.log('Cloudinary Error:', error);
                        return res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
                    }
                    //return res.status(200).json({ url: result.secure_url });
                });
            //console.log(result.secure_url);
            uploadedImagesData.push(result.secure_url);
        }

        //res.status(201).json(uploadedImagesData);

        // const photos = Array.isArray(req.files.photo) ? req.files.photo : [req.files.photo];
        // const uploadPromises = photos.map(photo =>
        //     new Promise((resolve, reject) => {
        //         cloudinaryVar.uploader.upload(photo.tempFilePath, (err, result) => {
        //             if (err) {
        //                 console.error("Error uploading image:", err);
        //                 reject(err);
        //             } else {
        //                 resolve(result.secure_url);
        //             }
        //         });
        //     })
        // );

        const uploadedUrls = await Promise.all(uploadedImagesData);

        // Destructuring SOPInstanceUID, instanceNumber, SOPClassUID, TransferSyntaxUID, seriesInstanceUID from req.body
        const { SOPInstanceUID, instanceNumber, SOPClassUID, TransferSyntaxUID, seriesInstanceUID } = req.body;

        // Create an object to represent the images data
        const imagesData = {
            SOPInstanceUID,
            instanceNumber,
            SOPClassUID,
            TransferSyntaxUID,
            seriesInstanceUID,
            FileUrls: uploadedUrls,
        };

        //console.log(imagesData)
        // Assuming 'Image' is your Mongoose model for storing images
        const images = await Image.create(imagesData);
        res.status(201).json(images);

    } catch (err) {
        console.error('Error uploading images:', err);
        res.status(500).json({ error: 'Failed to upload the images' });
    }
}


// //new api with all send data by one
// async function uploadImages(req, res) {
//     try {
//         if (req.body.patientData) {
//             // Handle patient data creation
//             const newPatient = req.body.patientData;
//             const result = await patientMod.create(newPatient);
//             res.status(201).json(result);
//         } else if (req.body.studyData) {
//             // Handle study data creation
//             const newStudy = req.body.studyData;
//             const study = await Study.create(newStudy);
//             res.status(201).json(study);
//         } else if (req.body.seriesData) {
//             // Handle series data creation
//             const newSeries = req.body.seriesData;
//             const series = await Series.create(newSeries);
//             res.status(201).json(series);
//         } else {
//             // Check if any files were uploaded
//             if (!req.files || req.files.length === 0) {
//                 return res.status(400).json({ error: 'No image files provided.' });
//             }

//             const uploadedImagesData = [];

//             // Upload each image to Cloudinary and save image data in MongoDB
//             for (const file of req.files) {
//                 const result = await cloudinaryVar.uploader.upload(file.path, {
//                     use_filename: true,
//                     unique_filename: false,
//                     resource_type: "raw",
//                     max_file_size: 10000000, // 10 MB in bytes (10 * 1024 * 1024 bytes)
//                 });

//                 if (result.error) {
//                     console.log('Cloudinary Error:', result.error);
//                     return res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
//                 }

//                 uploadedImagesData.push(result.secure_url);
//             }

//             const uploadedUrls = await Promise.all(uploadedImagesData);

//             // Destructuring SOPInstanceUID, instanceNumber, SOPClassUID, TransferSyntaxUID, seriesInstanceUID from req.body
//             const { SOPInstanceUID, instanceNumber, SOPClassUID, TransferSyntaxUID, seriesInstanceUID } = req.body;

//             // Create an object to represent the images data
//             const imagesData = {
//                 SOPInstanceUID,
//                 instanceNumber,
//                 SOPClassUID,
//                 TransferSyntaxUID,
//                 seriesInstanceUID,
//                 FileUrls: uploadedUrls,
//             };

//             const images = await Image.create(imagesData);
//             res.status(201).json(images);
//         }
//     } catch (err) {
//         console.error('Error handling request:', err);
//         res.status(500).json({ error: 'Failed to process the request' });
//     }
// }


// GET /api/images: Retrieve all images
async function getImages(req, res) {
    try {
        const images = await Image.find({});
        res.json(images);
    } catch (err) {
        console.error('Error fetching images:', err);
        res.status(500).json({ error: 'Failed to retrieve images' });
    }
}

async function getImageById(req, res) {
    try {
        const imageId = req.params.id;
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.json(image);
    } catch (err) {
        console.error('Error fetching image:', err);
        res.status(500).json({ error: 'Failed to retrieve the image' });
    }
}

// POST /api/images: Create a new image
async function createImage(req, res) {
    try {
        const newImage = req.body;
        const image = await Image.create(newImage);
        res.status(201).json(image);
    } catch (err) {
        console.error('Error creating image:', err);
        res.status(500).json({ error: 'Failed to create the image' });
    }
}

// PUT /api/images/:id: Update a specific image by ID
async function putImages(req, res) {
    try {
        // Assuming 'Image' is your Mongoose model for storing images
        const imageToUpdate = await Image.findById(req.params.id);

        if (!imageToUpdate) {
            return res.status(404).json({ error: 'Image not found.' });
        }

        // Update image properties if they are present in the request body
        if (req.body.SOPInstanceUID) {
            imageToUpdate.SOPInstanceUID = req.body.SOPInstanceUID;
        }
        if (req.body.instanceNumber) {
            imageToUpdate.instanceNumber = req.body.instanceNumber;
        }
        if (req.body.SOPClassUID) {
            imageToUpdate.SOPClassUID = req.body.SOPClassUID;
        }
        if (req.body.TransferSyntaxUID) {
            imageToUpdate.TransferSyntaxUID = req.body.TransferSyntaxUID;
        }
        // You may add more properties to update here

        // Save the updated image data
        await imageToUpdate.save();

        res.status(200).json(imageToUpdate);
    } catch (err) {
        console.error('Error updating image:', err);
        res.status(500).json({ error: 'Failed to update the image' });
    }
}

// DELETE /api/images/:id: Delete a specific image by ID
async function deleteImages(req, res) {
    try {
        // Assuming 'Image' is your Mongoose model for storing images
        const imageToDelete = await Image.findById(req.params.id);

        if (!imageToDelete) {
            return res.status(404).json({ error: 'Image not found.' });
        }

        // Delete the image data from the database
        await imageToDelete.remove();

        res.status(200).json({ message: 'Image deleted successfully.' });
    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ error: 'Failed to delete the image' });
    }
}


module.exports = {
    getImages,
    createImage,
    putImages,
    deleteImages, getImageById, uploadImages,
    upload
};
