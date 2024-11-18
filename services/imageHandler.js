
const fs = require('fs');
const path = require('path');

async function handleImageUpload(contentData, req, existingImage = null) {
    if (!contentData.image || !contentData.image.startsWith("data:image/")) {
        return existingImage;
    }

    if (existingImage) {
        const oldImagePath = path.join(__dirname, "../uploads", path.basename(existingImage));
        try {
            fs.unlinkSync(oldImagePath);
        } catch (error) {
            console.error("Failed to delete old image:", error);
        }
    }

    const match = contentData.image.match(/^data:image\/(png|jpeg|jpg|gif|bmp);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid image format");
    }

    const imageData = match[2];
    const fileName = `${Date.now()}.png`;
    const filePath = path.join(__dirname, "../uploads", fileName);

    try {
        fs.writeFileSync(filePath, imageData, { encoding: 'base64' });
        return `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
    } catch (error) {
        console.error("Failed to save image:", error);
        throw new Error("Failed to save image");
    }
}

module.exports = handleImageUpload;
