// controllers/studyController.js

const Study = require('../../models/studyModels/StudyModel.js');

// GET /api/studies: Retrieve all studies
async function getStudies(req, res) {
    try {
        const studies = await Study.find({});
        res.json(studies);
    } catch (err) {
        console.error('Error fetching studies:', err);
        res.status(500).json({ error: 'Failed to retrieve studies' });
    }
}
// GET /api/studies: Retrieve all studies
async function getStudiesbyID(req, res) {
    try {
        const studyId = req.params.id;
        //console.log(studyId)
        const study = await Study.findById(studyId);

        if (!study) {
            return res.status(404).json({ error: 'Study not found' });
        }

        res.json(study);
    } catch (err) {
        console.error('Error fetching study:', err);
        res.status(500).json({ error: 'Failed to retrieve the study' });
    }
}

// POST /api/studies: Create a new study
async function createStudy(req, res) {
    try {
        const newStudy = req.body;
        const study = await Study.create(newStudy);
        res.status(201).json(study);
    } catch (err) {
        console.error('Error creating study:', err);
        res.status(500).json({ error: 'Failed to create the study' });
    }
}

// PUT /api/studies/:id: Update a specific study by ID
async function updateStudy(req, res) {
    try {
        const studyId = req.params.id;
        const updatedStudy = req.body;
        const study = await Study.findByIdAndUpdate(studyId, updatedStudy, { new: true });

        if (!study) {
            return res.status(404).json({ error: 'Study not found' });
        }

        res.json(study);
    } catch (err) {
        console.error('Error updating study:', err);
        res.status(500).json({ error: 'Failed to update the study' });
    }
}

// DELETE /api/studies/:id: Delete a specific study by ID
async function deleteStudy(req, res) {
    try {
        const studyId = req.params.id;
        const result = await Study.findByIdAndDelete(studyId);

        if (!result) {
            return res.status(404).json({ error: 'Study not found' });
        }

        res.json({ message: 'Study deleted successfully' });
    } catch (err) {
        console.error('Error deleting study:', err);
        res.status(500).json({ error: 'Failed to delete the study' });
    }
}

module.exports = {
    getStudies,
    createStudy,
    updateStudy,
    deleteStudy,
    getStudiesbyID
};
