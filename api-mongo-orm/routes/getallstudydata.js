const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
//const allController = require('../controllers/allController.js')
const Patient = require('../models/patientsModels/PatientsModel.js');
const Study = require('../models/studyModels/StudyModel.js');
const Series = require('../models/seriesModels/SeriesModel.js');
const Image = require('../models/imageModels/ImageModel.js');

router.get('/getstudydata', async (req, res) => {
    try {
        const patients = await Patient.find().exec();
        const responseData = [];

        for (const patient of patients) {
            const study = await Study.findOne({ patient: patient._id }).exec();
            const series = await Series.findOne({ study: study._id }).exec();
            const image = await Image.findOne({ seriesInstanceUID: series._id }).exec();

            const patientData = {
                patient,
                study,
                series,
                image,
            };

            responseData.push(patientData);
        }

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});


router.get('/getstudeisdata', async (req, res) => {
    try {
        const patients = await Patient.find().exec();
        const responseData = [];

        for (const patient of patients) {
            const study = await Study.findOne({ patient: patient._id }).exec();

            if (study) {
                const seriesList = await Series.find({ study: study._id }).exec();
                const seriesArray = [];

                for (const series of seriesList) {
                    const images = await Image.find({ seriesInstanceUID: series._id }).exec();
                    const imageUrlArray = images.map(image => ({ image_id: image.FileUrls }));

                    const seriesData = {
                        series_uid: series.seriesInstanceUID,
                        sop_class_uid: series.Modality,
                        series_description: series.SeriesDescription,
                        images_url_array: imageUrlArray,
                    };

                    seriesArray.push(seriesData);
                }

                const patientData = {
                    patient_id: patient.PatientId,
                    patient_name: patient.PatientName,
                    study_uid: study.StudyInstanceUid,
                    study_description: study.StudyDescription,
                    study_date: study.StudyDate,
                    modality: study.Modality,
                    images_count: seriesArray.reduce((total, series) => total + series.images_url_array.length, 0),
                    series_array: seriesArray,
                };

                responseData.push(patientData);
            }
        }

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});


// ---------------------------------- Create NEW api to post all that by one time

// All data post
// router.post('/createstudydata', async (req, res) => {
//     try {
//         // Extract data from the request body
//         const {
//             patient_id,
//             patient_name,
//             study_uid,
//             study_description,
//             study_date,
//             images_count,
//             series_array,
//         } = req.body;

//         // Create a new patient if it doesn't exist, or find an existing one
//         let patient = await Patient.findOne({ patient_id }).exec();
//         if (!patient) {
//             patient = new Patient({ patient_id, patient_name });
//             await patient.save();
//         }

//         // Create a new study document
//         const study = new Study({
//             patient: patient._id,
//             study_uid,
//             study_description,
//             study_date,
//             images_count,
//         });
//         await study.save();

//         // Insert series and image data into the database
//         for (const seriesData of series_array) {
//             const { series_uid, sop_class_uid, series_description, images_url_array } = seriesData;

//             const series = new Series({
//                 study: study._id,
//                 series_uid,
//                 sopClassUID: sop_class_uid,
//                 seriesDescription: series_description,
//             });
//             await series.save();

//             for (const imageUrl of images_url_array) {
//                 const image = new Image({
//                     seriesInstanceUID: series._id,
//                     FileUrls: imageUrl.image_id,
//                 });
//                 await image.save();
//             }
//         }

//         res.status(201).json({ message: 'Study data created successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error creating study data' });
//     }
// });

router.get('/getdata', async (req, res) => {
    try {
        // Retrieve Patient data
        const patients = await Patient.find();

        // Retrieve Study data, populating the patient field
        const studies = await Study.find().populate('patient');

        // Retrieve Series data, populating the study field
        const series = await Series.find().populate('study');

        // Retrieve Image data, populating the seriesInstanceUID field
        const images = await Image.find().populate('seriesInstanceUID');

        // Return the retrieved data as a JSON response
        res.status(200).json({
            patients,
            studies,
            series,
            images,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Again create 
router.post('/createdata', async (req, res) => {
    try {
        // Create a new Patient document
        const patient = new Patient(req.body.patient);
        await patient.save();

        // Create a new Study document
        const study = new Study(req.body.study);
        study.patient = patient._id; // Assign the Patient _id to the Study's patient field
        await study.save();

        // Create a new Series document
        const series = new Series(req.body.series);
        series.study = study._id; // Assign the Study _id to the Series' study field
        await series.save();

        // Create a new Image document
        const image = new Image(req.body.image);
        image.seriesInstanceUID = series._id; // Assign the Series _id to the Image's seriesInstanceUID field
        await image.save();

        res.status(201).json({ message: 'Data created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router