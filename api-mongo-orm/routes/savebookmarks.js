const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const Bookmark = require('../models/MedicalData/Bookmarks.js')


router.get('/bookmarks', async (req, res) => {
    try {
        const bookmarks = await Bookmark.find();
        res.status(200).json(bookmarks);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/savebookmarks', async (req, res) => {
    try {
        const { GetUser, StudyId, ID } = req.body;
        const existingBookmark = await Bookmark.findOne({ userId: GetUser, studyId: StudyId });
        if (existingBookmark) {
            return res.status(400).json({ success: false, message: 'Study already bookmarked' });
        }
        const bookmark = new Bookmark({
            userId: GetUser,
            studyId: StudyId,
            objId: ID
        });
        //console.log(bookmark)
        await bookmark.save();
        res.status(201).json({ success: true, message: 'Study bookmarked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

})

module.exports = router