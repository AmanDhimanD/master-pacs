import React from 'react';
import JSZip from 'jszip';

const MedicalImageDownloadButton = ({ imageIDs }) => {
    const handleDownloadImages = async () => {
        const zip = new JSZip();

        // Create a Promise for each image download
        const downloadPromises = imageIDs.map(async (imageURL, index) => {
            const response = await fetch(imageURL);
            const blob = await response.blob();
            zip.file(`image${index + 1}.dcm`, blob);
        });

        // Wait for all image downloads to complete
        await Promise.all(downloadPromises);

        // Generate the zip file
        zip.generateAsync({ type: 'blob' }).then((content) => {
            // Create a URL for the blob
            const blobURL = URL.createObjectURL(content);

            // Create an invisible anchor element
            const link = document.createElement('a');
            link.href = blobURL;
            link.download = 'medical_images.zip';

            // Trigger the download
            link.click();

            // Clean up the created URL
            URL.revokeObjectURL(blobURL);
        });
    };

    return (
        <button onClick={handleDownloadImages}>
            Download Images as Zip
        </button>
    );
};

export default MedicalImageDownloadButton;
