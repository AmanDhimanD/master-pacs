const patientMod = require('../../models/patientsModels/PatientsModel.js')
const mongoose = require('mongoose');


async function getAllPatients(req, res) {
    try {
        const patients = await patientMod.find({})
        res.json(patients);
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).json({ error: 'Failed to retrieve patients' });
    }
}

async function getPatientByid(req, res) {
    try {
        const patientId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ error: 'Invalid patient ID' });
        }

        const patient = await patientMod.findById(patientId);

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(patient);
    } catch (err) {
        console.error('Error fetching patient:', err);
        res.status(500).json({ error: 'Failed to retrieve the patient' });
    }
}

async function addPatients(req, res) {
    try {
        const newPatient = req.body;
        const result = await patientMod.create(newPatient);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error creating patient:', err);
        res.status(500).json({ error: 'Failed to create the patient' });
    }
}

async function updatePatient(req, res) {
    try {
        const patientId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ error: 'Invalid patient ID' });
        }

        const updatedPatient = req.body;
        const result = await patientMod.findByIdAndUpdate(patientId, updatedPatient, {
            new: true,
        });

        if (!result) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(result);
    } catch (err) {
        console.error('Error updating patient:', err);
        res.status(500).json({ error: 'Failed to update the patient' });
    }
}

async function deleteByid(req, res) {
    try {
        const patientId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ error: 'Invalid patient ID' });
        }

        const result = await patientMod.deleteOne({ _id: patientId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        console.error('Error deleting patient:', err);
        res.status(500).json({ error: 'Failed to delete the patient' });
    }
}

module.exports = {
    getAllPatients, getPatientByid, addPatients, updatePatient, deleteByid
}