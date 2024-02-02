require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const Patient = require('././models/patientsModels/PatientsModel');
const Study = require('././models/studyModels/StudyModel');
const Series = require('././models/seriesModels/SeriesModel');
const Image = require('././models/imageModels/ImageModel');
const connectDB = require('././db/db.config')
const cors = require('cors')

const app = express();
app.use(cors())
connectDB();
// Define API endpoint to get all data
app.get('/api/data', async (req, res) => {
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

// Define API endpoint to get all data by ID
app.get('/api/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const patient = await Patient.findOne({ Id: id }).exec();
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
