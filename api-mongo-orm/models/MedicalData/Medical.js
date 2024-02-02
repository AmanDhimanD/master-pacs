const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema that includes all the fields
const medicalDataSchema = new Schema({
    patient: {
        Id: String,
        PatientId: String,
        PatientName: String,
        Age: Number,
        Sex: String,
        BirthDate: Date,
        BirthTime: String,
    },
    study: {
        StudyInstanceUid: String,
        StudyDate: Date,
        StudyTime: String,
        AccessionNumber: String,
        StudyID: String,
        StudyDescription: String,
        ReferringPhysiciansName: String,
        PerformingPhysiciansName: String,
    },
    series: {
        seriesInstanceUID: String,
        Modality: String,
        SeriesNumber: String,
        SeriesDate: Date,
        SeriesTime: String,
        BodyPartExamined: String,
        SeriesDescription: String,
    },
    image: {
        SOPInstanceUID: String,
        instanceNumber: Number,
        SOPClassUID: String,
        TransferSyntaxUID: String,
        FileUrls: [String],
        SeriesInstanceUid: String,
    },
    reports: {
        reportText: String,
    }
}, { timestamps: true });

// Create a model (collection) based on the schema
const MedicalData = mongoose.model('MedicalData', medicalDataSchema);


module.exports = MedicalData