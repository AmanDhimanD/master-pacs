const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

const mongoURL = 'mongodb://localhost:27017';
const dbName = 'patientDB';

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const patientsCollection = db.collection('patients');

    // GET /api/patients
    app.get('/api/patients', async (req, res) => {
        try {
            const patients = await patientsCollection.find().toArray();
            res.json(patients);
        } catch (err) {
            console.error('Error fetching patients:', err);
            res.status(500).json({ error: 'Failed to retrieve patients' });
        }
    });

    // GET /api/patients/:id
    app.get('/api/patients/:id', async (req, res) => {
        try {
            const patientId = req.params.id;
            const patient = await patientsCollection.findOne({ _id: ObjectId(patientId) });

            if (!patient) {
                return res.status(404).json({ error: 'Patient not found' });
            }

            res.json(patient);
        } catch (err) {
            console.error('Error fetching patient:', err);
            res.status(500).json({ error: 'Failed to retrieve the patient' });
        }
    });

    // POST /api/patients
    app.post('/api/patients', async (req, res) => {
        try {
            const newPatient = req.body;
            const result = await patientsCollection.insertOne(newPatient);

            res.status(201).json(result.ops[0]);
        } catch (err) {
            console.error('Error creating patient:', err);
            res.status(500).json({ error: 'Failed to create the patient' });
        }
    });

    // PUT /api/patients/:id
    app.put('/api/patients/:id', async (req, res) => {
        try {
            const patientId = req.params.id;
            const updatedPatient = req.body;

            const result = await patientsCollection.updateOne(
                { _id: ObjectId(patientId) },
                { $set: updatedPatient }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: 'Patient not found' });
            }

            res.json(updatedPatient);
        } catch (err) {
            console.error('Error updating patient:', err);
            res.status(500).json({ error: 'Failed to update the patient' });
        }
    });

    // DELETE /api/patients/:id
    app.delete('/api/patients/:id', async (req, res) => {
        try {
            const patientId = req.params.id;
            const result = await patientsCollection.deleteOne({ _id: ObjectId(patientId) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Patient not found' });
            }

            res.json({ message: 'Patient deleted successfully' });
        } catch (err) {
            console.error('Error deleting patient:', err);
            res.status(500).json({ error: 'Failed to delete the patient' });
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
