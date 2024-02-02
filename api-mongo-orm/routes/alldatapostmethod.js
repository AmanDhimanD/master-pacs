const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const multer = require('multer');
const MedicalData = require('../models/MedicalData/Medical')

dotenv.config()
const cloudinaryVar = require("cloudinary").v2;
cloudinaryVar.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_APP_SECRET,
});


// // Define a schema that includes all the fields
// const medicalDataSchema = new mongoose.Schema({
//     patient: {
//         Id: String,
//         PatientId: String,
//         PatientName: String,
//         Age: Number,
//         Sex: String,
//         BirthDate: Date,
//         BirthTime: String,
//     },
//     study: {
//         StudyInstanceUid: Number,
//         StudyDate: Date,
//         StudyTime: String,
//         AccessionNumber: Number,
//         StudyID: Number,
//         StudyDescription: String,
//         ReferringPhysiciansName: String,
//         PerformingPhysiciansName: String,
//     },
//     series: {
//         seriesInstanceUID: Number,
//         Modality: String,
//         SeriesNumber: Number,
//         SeriesDate: Date,
//         SeriesTime: String,
//         BodyPartExamined: String,
//         SeriesDescription: String,
//     },
//     image: {
//         SOPInstanceUID: Number,
//         instanceNumber: Number,
//         SOPClassUID: String,
//         TransferSyntaxUID: String,
//         FileUrls: [String],
//     },
//     reports: {
//         reportText: String,
//     }
// });

// // Create a model (collection) based on the schema
//  const MedicalData = mongoose.model('MedicalData', medicalDataSchema);


router.get('/getdata', async (req, res) => {
    try {
        // Extract query parameters from the request
        const { patientName, patientId, studyDate, modality, studyDescription } = req.query;

        // Create a filter object based on the provided criteria
        const filter = {};

        if (patientName) {
            filter['patient.PatientName'] = patientName;
        }
        if (patientId) {
            filter['patient.PatientId'] = patientId;
        }
        if (studyDate) {
            filter['study.StudyDate'] = new Date(studyDate);
        }
        if (modality) {
            filter['series.Modality'] = modality;
        }
        if (studyDescription) {
            filter['study.StudyDescription'] = studyDescription;
        }

        // Find data that matches the filter criteria
        const data = await MedicalData.find(filter);

        // Return the matched data
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a "get by id" API endpoint
router.get('/getdata/:id', async (req, res) => {
    try {
        // Find the medical data by ID
        const medicalData = await MedicalData.findById(req.params.id);

        // Check if the data was found
        if (!medicalData) {
            return res.status(404).json({ error: 'Data not found' });
        }

        // Return the data
        res.status(200).json(medicalData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/* ----------------------------------- JSON Type Response (LIKE JSON- he sent) -------------------------------------- */

router.get('/medical-data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(req.body)
        // console.log(id)
        // Find the medical data by ID
        const medicalData = await MedicalData.findById(id);

        if (!medicalData) {
            return res.status(404).json({ error: 'Medical data not found' });
        }
        // Create the instanceList array by mapping over FileUrls
        const instanceList = medicalData.image.FileUrls.map((fileUrl) => ({
            imageId: fileUrl,
        }));

        // Transform the data into the desired format
        const formattedData = {
            patientName: medicalData.patient.PatientName,
            patientId: medicalData.patient.PatientId,
            studyDate: medicalData.study.StudyDate.toISOString().split('T')[0], // Format date as "YYYY-MM-DD"
            modality: medicalData.series.Modality,
            studyDescription: medicalData.study.StudyDescription,
            numImages: medicalData.image.FileUrls.length.toString(),
            studyId: medicalData.study.StudyInstanceUid,
            seriesList: [
                {
                    seriesUid: medicalData.series.seriesInstanceUID,
                    SOPClassUID: medicalData.image.SOPClassUID,
                    seriesDescription: medicalData.series.SeriesDescription,
                    seriesNumber: medicalData.series.SeriesNumber.toString(),
                    instanceList: instanceList,
                },
            ],
        };
        res.json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// old api that not save image online on cloudinary
// router.post('/createdata', async (req, res) => {
//     try {
//         // Create a new MedicalData document based on the request body
//         const medicalData = new MedicalData(req.body);

//         // Save the data to the collection
//         const savedData = await medicalData.save();

//         res.status(201).json({ message: 'Data created successfully', data: savedData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.put('/updatedata/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the existing medical data by ID
        const existingData = await MedicalData.findById(id);

        // Check if the data with the specified ID exists
        if (!existingData) {
            return res.status(404).json({ error: 'Data not found' });
        }

        // Update the data with the new data from the request body
        existingData.set(req.body);

        // Save the updated data
        const updatedData = await existingData.save();

        // Return the updated data
        res.status(200).json(updatedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


/* ----------------------------------- JSON Type Response-------------------------------------------------------- */

/* ----------------------------------- Create data and image upload on cloudinary-------------------------------------------------------- */
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit, change as needed
});

router.post('/createdata', upload.array("FileURL", 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            const medicalData = new MedicalData(req.body);
            // Save the data to the collection
            const savedData = await medicalData.save();
            console.log("Data Created successfully")
            res.status(201).json({ message: 'Data created successfully', data: savedData });
        }
        else {
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

            const medicalData = new MedicalData({
                patient: req.body.patient,
                study: req.body.study,
                series: req.body.series,
                image: {
                    SOPInstanceUID: req.body.image.SOPInstanceUID,
                    instanceNumber: req.body.image.instanceNumber,
                    SOPClassUID: req.body.image.SOPClassUID,
                    TransferSyntaxUID: req.body.image.TransferSyntaxUID,
                    FileUrls: uploadedImagesData // Save the Cloudinary URL
                }
            });

            // Save the data to the collection
            const savedData = await medicalData.save();
            console.log("Data Created successfully")
            res.status(201).json({ message: 'Data created successfully', data: savedData });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/* ----------------------------------- Create data and image upload on cloudinary-------------------------------------------------------- */


/* ----------------------------------- Append the data in the series by id patients -------------------------------------------------------- */
// **************** Incompletet *******************8

// router.put('/series/:id', async (req, res) => {
//     const { id } = req.params;
//     const requestData = req.body;

//     const existingDocument = await MedicalData.findOne({ _id: id });

//     if (!existingDocument) {
//         return res.status(404).json({ error: 'Document not found' });
//     }

//     MedicalData.series.push(requestData.series);

//     // Respond with a success message
//     res.status(201).json({ message: 'Data appended successfully' });
// });

/* ----------------------------------- Append the data in the series by id patients -------------------------------------------------------- */


/* ----------------------------------- Api with Params -------------------------------------------------------- */

router.get('/getstudydata', async (req, res) => {
    try {
        // Extract the studyId from the query parameters
        const { studyId } = req.query;

        // Find the medical data by StudyID
        const medicalData = await MedicalData.findOne({ 'study.StudyID': studyId });

        if (!medicalData) {
            return res.status(404).json({ error: 'Medical data not found' });
        }

        // Transform the data into the desired format
        // const formattedData = {
        //     patientName: medicalData.patient.PatientName,
        //     patientId: medicalData.patient.PatientId,
        //     studyDate: medicalData.study?.StudyDate?.toISOString()?.split('T')[0] || '',
        //     modality: medicalData.series.Modality,
        //     studyDescription: medicalData.study.StudyDescription,
        //     numImages: medicalData.image.FileUrls.length.toString(),
        //     studyInstanceUID: medicalData.study.StudyInstanceUid,
        //     seriesList: [
        //         {
        //             seriesUid: medicalData.series.seriesInstanceUID,
        //             SOPClassUID: medicalData.image.SOPClassUID,
        //             seriesDescription: medicalData.series.SeriesDescription,
        //             seriesNumber: medicalData.series.SeriesNumber,
        //             instanceList: [
        //                 {
        //                     //imageId: medicalData.image.SOPInstanceUID,
        //                     imageID: medicalData.image.FileUrls
        //                 },
        //             ],
        //         },
        //     ],
        // };
        const formattedData = {
            patientName: medicalData.patient.PatientName,
            patientId: medicalData.patient.PatientId,
            studyDate: medicalData.study.StudyDate.toISOString().split('T')[0] || '',
            modality: medicalData.series.Modality,
            studyDescription: medicalData.study.StudyDescription,
            numImages: medicalData.image.FileUrls.length.toString(),
            studyInstanceUID: medicalData.study.StudyInstanceUid,
            seriesList: [
                {
                    seriesUid: medicalData.series.seriesInstanceUID,
                    SOPClassUID: medicalData.image.SOPClassUID,
                    seriesDescription: medicalData.series.SeriesDescription,
                    seriesNumber: medicalData.series.SeriesNumber.toString(),
                    instanceList: medicalData.image.FileUrls.map(url => ({ imageID: url })),
                },
            ],
        };

        // Send the formatted data as a JSON response
        res.json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

/* ---------------------------------- Api with Params  -------------------------------------------------------- */


/* ---------------------------------- Save Reports -------------------------------------------------------- */
router.post('/savereports', async (req, res) => {
    try {
        const { id, reportText } = req.body;

        // Find the existing document by id
        const findData = await MedicalData.findById(id);

        if (!findData) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // Update the 'reports' field with the new reportText
        findData.reports = {
            reportText: reportText,
        };
        // Save the updated document
        await findData.save();

        res.status(200).json(req.body); // Respond with the updated document

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/* ---------------------------------- Save Reports -------------------------------------------------------- */


/* ---------------------------------- save Reports -------------------------------------------------------- */

/* ---------------------------------- Save Reports -------------------------------------------------------- */


/* ########### Image upload with data ############ */


/* ########### Image upload with data ############ */
module.exports = router



















// ------------------------------- Working api but not use yet Save for refernce ------------------------------- //

// Define a route that handles the PUT request to update all the data, including images (BY SERIES TYPE)
// router.put('/medical-data/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Find the medical data by ID
//         const medicalData = await MedicalData.findById(id);

//         if (!medicalData) {
//             return res.status(404).json({ error: 'Medical data not found' });
//         }

//         // Update the medical data based on the request body
//         const updatedData = req.body;

//         // Update patient data
//         medicalData.patient.PatientName = updatedData.patientName;
//         medicalData.patient.PatientId = updatedData.patientId;

//         // Update study data
//         medicalData.study.StudyDate = new Date(updatedData.studyDate);
//         medicalData.series.Modality = updatedData.modality;
//         medicalData.study.StudyDescription = updatedData.studyDescription;

//         // Update image instances
//         if (Array.isArray(updatedData.seriesList) && updatedData.seriesList.length > 0) {
//             const imageUrls = updatedData.seriesList[0].instanceList[0].imageurl;
//             medicalData.image.FileUrls = imageUrls;
//         }

//         // Save the updated data to the database
//         await medicalData.save();

//         // Send a response indicating success
//         //res.json({ message: 'Medical data updated successfully' });
//         res.json({ medicalData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });


//------------------------------- PUT REQ BY ID

// router.put('/updatedata/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Find the existing medical data by ID
//         const existingData = await MedicalData.findById(id);

//         // Check if the data with the specified ID exists
//         if (!existingData) {
//             return res.status(404).json({ error: 'Data not found' });
//         }

//         // Update the data with the new data from the request body
//         existingData.set(req.body);

//         // Save the updated data
//         const updatedData = await existingData.save();

//         // Return the updated data
//         res.status(200).json(updatedData);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
