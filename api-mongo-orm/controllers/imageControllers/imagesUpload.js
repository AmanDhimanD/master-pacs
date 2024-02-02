const mime = require('mime');
const gm = require('gm').subClass({ imageMagick: true });
const fs = require('fs');


async function convertDICOMToPNG(dicomFilePath) {
    return new Promise((resolve, reject) => {
        const outputFilePath = dicomFilePath.replace('.dcm', '.png');
        gm(dicomFilePath).write(outputFilePath, (err, stdout, stderr) => {
            if (err) {
                console.error('Error converting DICOM to PNG:', err);
                console.error('Standard Output:', stdout);
                console.error('Standard Error:', stderr);
                reject(err);
            } else {
                console.log('Conversion successful:', outputFilePath);
                resolve(outputFilePath);
            }
        });
    });
}
async function uploadImages(req, res) {
    try {
        // Check if any files or binary data were uploaded
        if (!req.files || req.files.length === 0) {
            if (!req.body || !req.body.length) {
                return res.status(400).json({ error: 'No image files or binary data provided.' });
            }
        }

        const uploadedImagesData = [];

        // Check if binary data is provided
        if (req.body && req.body.length) {
            // Handle binary data
            const fileExtension = mime.getExtension(req.header('content-type'));
            if (fileExtension === 'dcm' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
                if (fileExtension === 'dcm') {
                    try {
                        const tempFilePath = `temp_${Date.now()}.${fileExtension}`;
                        fs.writeFileSync(tempFilePath, req.body);
                        const convertedFilePath = await convertDICOMToPNG(tempFilePath);
                        const result = await cloudinaryVar.uploader.upload(convertedFilePath);
                        fs.unlinkSync(convertedFilePath); // Delete the converted PNG file after upload
                        fs.unlinkSync(tempFilePath); // Delete the temporary binary file
                        uploadedImagesData.push(result.secure_url);
                    } catch (err) {
                        console.log(`Error converting or uploading binary file:`, err);
                    }
                } else {
                    const tempFilePath = `temp_${Date.now()}.${fileExtension}`;
                    fs.writeFileSync(tempFilePath, req.body);
                    const result = await cloudinaryVar.uploader.upload(tempFilePath);
                    fs.unlinkSync(tempFilePath); // Delete the temporary binary file
                    uploadedImagesData.push(result.secure_url);
                }
            } else {
                console.log(`Skipping binary file - unsupported file type.`);
            }
        }

        // Handle uploaded files if any
        for (const file of req.files) {
            const fileExtension = file.originalname.split('.').pop().toLowerCase();
            // ... (existing code)
        }

        if (uploadedImagesData.length === 0) {
            return res.status(400).json({ error: 'No supported image files or binary data uploaded (DICOM, JPG, or PNG).' });
        }

        const uploadedUrls = await Promise.all(uploadedImagesData);

        // Destructuring SOPInstanceUID, instanceNumber, SOPClassUID, TransferSyntaxUID, seriesInstanceUID from req.body
        const { SOPInstanceUID, instanceNumber, SOPClassUID, TransferSyntaxUID, seriesInstanceUID } = req.body;

        // Create an object to represent the images data
        const imagesData = {
            SOPInstanceUID,
            instanceNumber,
            SOPClassUID,
            TransferSyntaxUID,
            seriesInstanceUID,
            FileUrls: uploadedUrls,
        };

        // ... (existing code)
    } catch (err) {
        console.error('Error uploading images:', err);
        res.status(500).json({ error: 'Failed to upload the images' });
    }
}

module.exports = { uploadImages }

