// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const alldataimagesController = require('../../controllers/alldataimagesControllers/alldataimagesController');
const authMiddleware = require('../../middlewares/authMiddleware.js')

// // GET /api/images
// router.get('/', authMiddleware, alldataimagesController.getImages);
// router.get('/:id', authMiddleware, alldataimagesController.getImageById);

// // // POST /api/images
// // router.post('/', imageController.createImage);

// // PUT /api/images/:id
// router.put('/:id', authMiddleware, alldataimagesController.putImages);
// // DELETE /api/images/:id
// router.delete('/:id', authMiddleware, alldataimagesController.deleteImages);

router.post('/uploads', authMiddleware, alldataimagesController.upload.array("photo", 10), alldataimagesController.uploadImages);
//router.post('/uploads',  alldataimagesController.upload.array("photo", 10), alldataimagesController.uploadImages);


//router.post('/upload', authMiddleware, imageController.uploadImages)

module.exports = router;
