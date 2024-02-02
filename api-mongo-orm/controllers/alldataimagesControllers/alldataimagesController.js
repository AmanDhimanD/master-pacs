// controllers/imageController.js
const Image = require('../../models/imageModels/ImageModel.js');
const multer = require('multer');
const dotenv = require("dotenv");
const mime = require('mime')
const mongoose = require('mongoose');
const MedicalData = require('../../models/MedicalData/Medical.js')

dotenv.config()
const cloudinaryVar = require("cloudinary").v2;
cloudinaryVar.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_APP_SECRET,
});



const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});

// async function uploadImages(req, res) {
//     try {

//         const {
//             PatientId,
//             PatientName,
//             Age,
//             Sex,
//             BirthDate,
//             BirthTime,
//             StudyInstanceUid,
//             StudyDate,
//             StudyTime,
//             AccessionNumber,
//             StudyID,
//             StudyDescription,
//             ReferringPhysiciansName,
//             PerformingPhysiciansName,
//             SeriesInstanceUid,
//             Modality,
//             SeriesNumber,
//             SeriesDate,
//             SeriesTime,
//             BodyPartExamined,
//             SeriesDescription,
//             SOPInstanceUid,
//             InstanceNumber,
//             SOPClassUid,
//             TransferSyntaxUid,
//         } = req.body;

//         // Create a new Patient object
//         const patient = {
//             Id: PatientId,
//             PatientId,
//             PatientName,
//             Age: parseInt(Age), // Convert Age to a number
//             Sex,
//             BirthDate: new Date(BirthDate), // Convert BirthDate to a Date object
//             BirthTime,
//         };

//         // Create a new Study object
//         const study = {
//             StudyInstanceUid,
//             StudyDate: new Date(StudyDate), // Convert StudyDate to a Date object
//             StudyTime,
//             AccessionNumber,
//             StudyID,
//             StudyDescription,
//             ReferringPhysiciansName,
//             PerformingPhysiciansName,
//         };
//         // Create a new Series object
//         const series = {
//             seriesInstanceUID: SeriesInstanceUid,
//             Modality,
//             SeriesNumber: parseInt(SeriesNumber),
//             SeriesDate: new Date(SeriesDate),
//             SeriesTime,
//             BodyPartExamined,
//             SeriesDescription,
//         };

//         const uploadedImagesData = [];
//         for (const file of req.files) {
//             const result = await cloudinaryVar.uploader.upload(file.path, {
//                 use_filename: true,
//                 unique_filename: false, resource_type: "raw", max_file_size: 10000000, // 10 MB in bytes (10 * 1024 * 1024 bytes)
//             },
//                 (error, result) => {
//                     if (error) {
//                         console.log('Cloudinary Error:', error);
//                         return res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
//                     }
//                     //return res.status(200).json({ url: result.secure_url });
//                 });
//             uploadedImagesData.push(result.secure_url);
//         }
//         //console.log(uploadedImagesData)
//         const imagesData = {
//             SOPInstanceUid,
//             InstanceNumber,
//             SOPClassUid,
//             TransferSyntaxUid,
//             SeriesInstanceUid,
//             FileUrls: uploadedImagesData,
//         };

//         const newMedicalData = new MedicalData({
//             patient,
//             study,
//             series,
//             image:imagesData
//         });

//         // Save the data to the database
//         await newMedicalData.save();

//         res.status(201).json(newMedicalData);

//     } catch (err) {
//         console.error('Error uploading images:', err);
//         res.status(500).json({ error: 'Failed to upload the images' });
//     }
// }
async function uploadImages(req, res) {
    try {

        const {
            PatientId,
            PatientName,
            Age,
            Sex,
            BirthDate,
            BirthTime,
            StudyInstanceUid,
            StudyDate,
            StudyTime,
            AccessionNumber,
            StudyID,
            StudyDescription,
            ReferringPhysiciansName,
            PerformingPhysiciansName,
            SeriesInstanceUid,
            Modality,
            SeriesNumber,
            SeriesDate,
            SeriesTime,
            BodyPartExamined,
            SeriesDescription,
            SOPInstanceUid,
            InstanceNumber,
            SOPClassUid,
            TransferSyntaxUid,
        } = req.body;

        // Create a new Patient object
        const patient = {
            Id: PatientId,
            PatientId,
            PatientName,
            Age: parseInt(Age), // Convert Age to a number
            Sex,
            BirthDate: new Date(BirthDate), // Convert BirthDate to a Date object
            BirthTime,
        };

        // Create a new Study object
        const study = {
            StudyInstanceUid,
            StudyDate: new Date(StudyDate), // Convert StudyDate to a Date object
            StudyTime,
            AccessionNumber,
            StudyID,
            StudyDescription,
            ReferringPhysiciansName,
            PerformingPhysiciansName,
        };
        // Create a new Series object
        const series = {
            seriesInstanceUID: SeriesInstanceUid,
            Modality,
            SeriesNumber: parseInt(SeriesNumber),
            SeriesDate: new Date(SeriesDate),
            SeriesTime,
            BodyPartExamined,
            SeriesDescription,
        };

        const existingUser = await MedicalData.findOne({ 'patient.Id': PatientId });

        if (existingUser) {
            // User already exists, append image URLs
            const uploadedImagesData = [];
            for (const file of req.files) {
                const result = await cloudinaryVar.uploader.upload(file.path, {
                    use_filename: true,
                    unique_filename: false,
                    resource_type: "raw",
                    max_file_size: 10000000,
                });

                uploadedImagesData.push(result.secure_url);
            }

            // Append image URLs to the existing user's data
            existingUser.image.FileUrls.push(...uploadedImagesData);

            // Save the updated user data
            await existingUser.save();

            res.status(200).json(existingUser);
        }
        else {
            //Create a new Patient object
            const patient = {
                Id: PatientId,
                PatientId,
                PatientName,
                Age: parseInt(Age), // Convert Age to a number
                Sex,
                BirthDate: new Date(BirthDate), // Convert BirthDate to a Date object
                BirthTime,
            };

            // Create a new Study object
            const study = {
                StudyInstanceUid,
                StudyDate: new Date(StudyDate), // Convert StudyDate to a Date object
                StudyTime,
                AccessionNumber,
                StudyID,
                StudyDescription,
                ReferringPhysiciansName,
                PerformingPhysiciansName,
            };
            // Create a new Series object
            const series = {
                seriesInstanceUID: SeriesInstanceUid,
                Modality,
                SeriesNumber: parseInt(SeriesNumber),
                SeriesDate: new Date(SeriesDate),
                SeriesTime,
                BodyPartExamined,
                SeriesDescription,
            };

            const uploadedImagesData = [];
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
                uploadedImagesData.push(result.secure_url);
            }
            //console.log(uploadedImagesData)
            const imagesData = {
                SOPInstanceUID: req.body.SOPInstanceUid,
                instanceNumber: req.body.InstanceNumber,
                SOPClassUID: req.body.SOPClassUid,
                TransferSyntaxUID: req.body.TransferSyntaxUid,
                SeriesInstanceUid: req.body.seriesInstanceUID,
                FileUrls: uploadedImagesData,
            };

            const newMedicalData = new MedicalData({
                patient,
                study,
                series,
                image: imagesData
            });

            // Save the data to the database
            await newMedicalData.save();

            res.status(201).json(newMedicalData);
        }


    } catch (err) {
        console.error('Error uploading images:', err);
        res.status(500).json({ error: 'Failed to upload the images' });
    }
}


module.exports = {
    uploadImages,
    upload
};

// if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ error: 'No image files provided.' });
// }

// const uploadedImagesData = [];

// for (const file of req.files) {
//     const result = await cloudinaryVar.uploader.upload(file.path, {
//         use_filename: true,
//         unique_filename: false, resource_type: "raw", max_file_size: 10000000,
//     },
//         (error, result) => {
//             if (error) {
//                 console.log('Cloudinary Error:', error);
//                 return res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
//             }
//         });
//     uploadedImagesData.push(result.secure_url);
// }

// const uploadedUrls = await Promise.all(uploadedImagesData);

// const { SOPInstanceUID, instanceNumber, SOPClassUID, TransferSyntaxUID, seriesInstanceUID } = req.body;

// const imagesData = {
//     SOPInstanceUID,
//     instanceNumber,
//     SOPClassUID,
//     TransferSyntaxUID,
//     seriesInstanceUID,
//     FileUrls: uploadedUrls,
// };

// const images = await Image.create(imagesData);