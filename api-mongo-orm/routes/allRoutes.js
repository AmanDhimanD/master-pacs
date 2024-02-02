const express = require('express');
const router = express.Router();
//const allController = require('../controllers/allController.js')
const Patient = require('../models/patientsModels/PatientsModel.js');
const Study = require('../models/studyModels/StudyModel.js');
const Series = require('../models/seriesModels/SeriesModel.js');
const Image = require('../models/imageModels/ImageModel.js');


// app.js - Adding a new route for combined details
// Define API endpoint to get all data
router.get('/data', async (req, res) => {
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

router.get('/data/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const patient = await Patient.findOne({ _id: id }).exec();
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const study = await Study.findOne({ patient: patient._id }).exec();
        if (!study) {
            return res.status(404).json({ error: 'Study not found' });
        }

        const series = await Series.findOne({ study: study._id }).exec();
        if (!series) {
            return res.status(404).json({ error: 'Series not found' });
        }

        const image = await Image.findOne({ seriesInstanceUID: series._id }).exec();
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        const responseData = {
            patient,
            study,
            series,
            image,
        };

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

router.get('/studydata/:id', async (req, res) => {
    const id = req.params.id;
    try {

        const study = await Study.findOne({ _id: id }).exec();
        if (!study) {
            return res.status(404).json({ error: 'Study not found' });
        }

        const responseData = {
            study

        }

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});


module.exports = router