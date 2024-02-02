const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    seriesInstanceUID: Number,
    Modality: String,
    SeriesNumber: Number,
    SeriesDate: Date,
    SeriesTime: String,
    BodyPartExamined: String,
    SeriesDescription: String,
    // Add a reference to the "Study" collection
    study: { type: mongoose.Schema.Types.ObjectId, ref: 'Study' }
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;
