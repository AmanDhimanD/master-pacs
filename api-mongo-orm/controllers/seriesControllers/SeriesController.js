// controllers/seriesController.js

const Series = require('../../models/seriesModels/SeriesModel.js');

// GET /api/series: Retrieve all series
async function getSeries(req, res) {
    try {
        const series = await Series.find({});
        res.json(series);
    } catch (err) {
        console.error('Error fetching series:', err);
        res.status(500).json({ error: 'Failed to retrieve series' });
    }
}

async function getSeriesById(req, res) {
    try {
        const seriesid = req.params.id;
        const series = await Series.findById(seriesid);

        if (!series) {
            return res.status(404).json({ error: 'Study not found' });
        }

        res.json(series);
    } catch (err) {
        console.error('Error fetching study:', err);
        res.status(500).json({ error: 'Failed to retrieve the study' });
    }
}

// POST /api/series: Create a new series
async function createSeries(req, res) {
    try {
        const newSeries = req.body;
        const series = await Series.create(newSeries);
        res.status(201).json(series);
    } catch (err) {
        console.error('Error creating series:', err);
        res.status(500).json({ error: 'Failed to create the series' });
    }
}

// PUT /api/series/:id: Update a specific series by ID
async function updateSeries(req, res) {
    try {
        const seriesId = req.params.id;
        const updatedSeries = req.body;
        const series = await Series.findByIdAndUpdate(seriesId, updatedSeries, { new: true });

        if (!series) {
            return res.status(404).json({ error: 'Series not found' });
        }

        res.json(series);
    } catch (err) {
        console.error('Error updating series:', err);
        res.status(500).json({ error: 'Failed to update the series' });
    }
}

// DELETE /api/series/:id: Delete a specific series by ID
async function deleteSeries(req, res) {
    try {
        const seriesId = req.params.id;
        const result = await Series.findByIdAndDelete(seriesId);

        if (!result) {
            return res.status(404).json({ error: 'Series not found' });
        }

        res.json({ message: 'Series deleted successfully' });
    } catch (err) {
        console.error('Error deleting series:', err);
        res.status(500).json({ error: 'Failed to delete the series' });
    }
}

module.exports = {
    getSeries,
    createSeries,
    updateSeries,
    deleteSeries, getSeriesById
};
