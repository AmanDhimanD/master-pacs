const mongoose = require('mongoose');

// Define the schema for the "Patient" collection
const patientSchema = new mongoose.Schema({
    Id: { type: String, required: true, unique: true },
    PatientId: { type: String, required: true },
    PatientName: { type: String, required: true },
    Age: { type: Number, required: true },
    Sex: { type: String, required: true },
    BirthDate: { type: Date, required: true },
    BirthTime: { type: String }
});

// Create the "Patient" model based on the schema
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
