require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const Patient = require('././models/patientsModels/PatientsModel');
const Study = require('././models/studyModels/StudyModel');
const Series = require('././models/seriesModels/SeriesModel');
const Image = require('././models/imageModels/ImageModel');
const connectDB = require('././db/db.config')


const app = express();
connectDB();


app.get('/api', async (req, res) => {
    const id = req.query.id;
    const dataType = req.query.type; // Add a query parameter for specifying data type

    if (!id || !dataType) {
        return res.status(400).json({ error: 'ID and dataType parameters are required' });
    }

    try {
        let data;

        switch (dataType) {
            case 'patient':
                data = await Patient.findOne({ Id: id }).exec();
                break;
            case 'study':
                data = await Study.findOne({ patient: id }).exec();
                break;
            case 'series':
                data = await Series.findOne({ study: id }).exec();
                break;
            case 'image':
                data = await Image.findOne({ seriesInstanceUID: id }).exec();
                break;
            default:
                return res.status(400).json({ error: 'Invalid dataType parameter' });
        }

        if (!data) {
            return res.status(404).json({ error: `${dataType.charAt(0).toUpperCase() + dataType.slice(1)} not found` });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
