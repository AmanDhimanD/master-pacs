const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookmarkSchema = new Schema({
    userId: String,
    studyId: String,
    objId: String,
}, { timestamps: true });

const Bookmark = mongoose.model('MedicalBookmarks', bookmarkSchema);
module.exports = Bookmark