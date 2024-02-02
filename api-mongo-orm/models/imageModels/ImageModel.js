const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    SOPInstanceUID: String,
    instanceNumber: Number,
    SOPClassUID: String,
    TransferSyntaxUID: String,
    FileUrls: [String],
    // Add a reference to the "Series" collection
    seriesInstanceUID: { type: Schema.Types.ObjectId, ref: 'Series' },
    receivingDate: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
