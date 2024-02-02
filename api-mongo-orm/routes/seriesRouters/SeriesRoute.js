// routes/seriesRoutes.js

const express = require('express');
const router = express.Router();
const seriesController = require('../../controllers/seriesControllers/SeriesController.js');
const authMiddleware  = require('../../middlewares/authMiddleware.js')

// GET /api/series
router.get('/', authMiddleware,seriesController.getSeries);

router.get('/:id', authMiddleware, seriesController.getSeriesById);

// POST /api/series
router.post('/', authMiddleware, seriesController.createSeries);

// PUT /api/series/:id
router.put('/:id', authMiddleware, seriesController.updateSeries);

// DELETE /api/series/:id
router.delete('/:id', authMiddleware, seriesController.deleteSeries);

module.exports = router;
