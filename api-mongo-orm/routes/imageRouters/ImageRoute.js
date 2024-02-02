// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/imageControllers/ImageControllers.js');
const authMiddleware = require('../../middlewares/authMiddleware.js')

// GET /api/images
router.get('/', authMiddleware, imageController.getImages);
router.get('/:id', authMiddleware, imageController.getImageById);

// // POST /api/images
// router.post('/', imageController.createImage);

// PUT /api/images/:id
router.put('/:id', authMiddleware, imageController.putImages);
// DELETE /api/images/:id
router.delete('/:id', authMiddleware, imageController.deleteImages);

router.post('/uploads', authMiddleware, imageController.upload.array("photo", 10), imageController.uploadImages);


//router.post('/upload', authMiddleware, imageController.uploadImages)

module.exports = router;
