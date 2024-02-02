const express = require('express');
const router = express.Router();
const patientCon = require('../../controllers/patientsControllers/PatientsController.js')
const authMiddleware = require('../../middlewares/authMiddleware.js')


router.get('/patients', authMiddleware, patientCon.getAllPatients)

router.get('/patients/:id', authMiddleware, patientCon.getPatientByid)

router.post('/patients', authMiddleware, patientCon.addPatients)

router.put('/patients/:id', authMiddleware, patientCon.updatePatient)

router.delete('/patients/:id', authMiddleware, patientCon.deleteByid)


module.exports = router;