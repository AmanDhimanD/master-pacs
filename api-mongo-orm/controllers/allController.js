const PatientModel = require('../models/patientsModels/PatientsModel')
const ImageModel = require('../models/imageModels/ImageModel')
const SeriesModel = require('../models/seriesModels/SeriesModel')
const StudyModel = require('../models/studyModels/StudyModel')

async function getAll(req, res) {
    try {
        const id = req.params.id;

        // Fetch the Patient by Id and populate associated data
        const patient = await PatientModel.findById(id)
        
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Construct the response object with all the details
        const combinedDetails = {
            patient,
            studies: patient.studies,
            series: patient.studies.map(study => study.series).flat(),
            images: patient.studies.map(study => study.series.map(series => series.images)).flat()
        };

        // Send the response to the client
        res.json(combinedDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { getAll }
