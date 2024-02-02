require('dotenv').config();
const mongoose = require('mongoose');
const Patient = require('././models/patientsModels/PatientsModel');
const Study = require('././models/studyModels/StudyModel');
const Series = require('././models/seriesModels/SeriesModel');
const Image = require('././models/imageModels/ImageModel');
const connectDB = require('././db/db.config')

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://shinsdhimag:kg3hVWd4uBTovrT1@cluster0.fi2ojzi.mongodb.net/test', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

const insertSampleData = async () => {
    try {
        await connectDB();
        // Sample Patient data
        const samplePatient = new Patient({
            Id: 'P002',
            PatientId: 'PID001',
            PatientName: 'Aman',
            Age: 30,
            Sex: 'Male',
            BirthDate: new Date('1993-05-15'),
            BirthTime: '08:30:00',
        });

        // Sample Study data
        const sampleStudy = new Study({
            StudyInstanceUid: 123456,
            StudyDate: new Date('2023-08-01'),
            StudyTime: '10:00:00',
            AccessionNumber: 12345,
            StudyID: 6789,
            StudyDescription: 'Sample Study',
            ReferringPhysiciansName: 'Dr. Smith',
            PerformingPhysiciansName: 'Dr. Johnson',
            patient: samplePatient._id, // Reference to the patient
        });

        // Sample Series data
        const sampleSeries = new Series({
            seriesInstanceUID: 123456,
            Modality: 'CT',
            SeriesNumber: 1,
            SeriesDate: new Date('2023-08-01'),
            SeriesTime: '10:30:00',
            BodyPartExamined: 'Head',
            SeriesDescription: 'Sample Series',
            study: sampleStudy._id, // Reference to the study
        });

        // Sample Image data
        const sampleImage = new Image({
            SOPInstanceUID: 'SOPUID001',
            instanceNumber: 1,
            SOPClassUID: '1.2.840.10008.5.1.4.1.1.2',
            TransferSyntaxUID: '1.2.840.10008.1.2.1',
            FileUrls: ['image_url_1', 'image_url_2'],
            seriesInstanceUID: sampleSeries._id, // Reference to the series
            receivingDate: new Date(),
        });
        // Save the sample data
        await samplePatient.save();
        await sampleStudy.save();
        await sampleSeries.save();
        await sampleImage.save();

        console.log('Sample data inserted successfully.');  // Disconnect from the database
        mongoose.disconnect();
    } catch (error) {
        console.error('Error inserting data:', error);
        mongoose.disconnect();
    }
};

// Call the function to insert data
insertSampleData();






// // Save the sample data
// samplePatient.save((err, savedPatient) => {
//     if (err) {
//         console.error('Error saving patient:', err);
//         return;
//     }
//     console.log('Patient saved:', savedPatient);

//     sampleStudy.save((err, savedStudy) => {
//         if (err) {
//             console.error('Error saving study:', err);
//             return;
//         }
//         console.log('Study saved:', savedStudy);

//         sampleSeries.save((err, savedSeries) => {
//             if (err) {
//                 console.error('Error saving series:', err);
//                 return;
//             }
//             console.log('Series saved:', savedSeries);

//             sampleImage.save((err, savedImage) => {
//                 if (err) {
//                     console.error('Error saving image:', err);
//                     return;
//                 }
//                 console.log('Image saved:', savedImage);

//                 // Disconnect from MongoDB after saving all data
//                 mongoose.disconnect();
//             });
//         });
//     });
// });