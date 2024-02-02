// routes/studyRoutes.js
const express = require('express');
const router = express.Router();
const studyController = require('../../controllers/studyControllers/StudyController.js');
const authMiddleware = require('../../middlewares/authMiddleware.js')


// GET /api/studies
router.get('/', authMiddleware, studyController.getStudies);

// GET /api/studies/:id
router.get('/:id', authMiddleware, studyController.getStudiesbyID);

// POST /api/studies
router.post('/', authMiddleware, studyController.createStudy);

// PUT /api/studies/:id
router.put('/:id', authMiddleware, studyController.updateStudy);

// DELETE /api/studies/:id
router.delete('/:id', authMiddleware, studyController.deleteStudy);

module.exports = router;
