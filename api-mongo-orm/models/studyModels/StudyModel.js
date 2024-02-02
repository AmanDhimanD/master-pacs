const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
    StudyInstanceUid: Number,
    StudyDate: Date,
    StudyTime: String,
    AccessionNumber: Number,
    StudyID: Number,
    StudyDescription: String,
    ReferringPhysiciansName: String,
    PerformingPhysiciansName: String,
    // Add a reference to the "Patient" collection
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
});

// Create a Mongoose model
const Study = mongoose.model('Study', studySchema);

module.exports = Study;
