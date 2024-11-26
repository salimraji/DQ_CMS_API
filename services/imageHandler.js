

const fs = require('fs');
const path = require('path');

async function handleImageUpload(imageBase64, tag, detailValue, req, type) {
    const match = imageBase64.match(/^data:image\/(png|jpeg|jpg|gif|bmp);base64,(.+)$/);
    if (!match) {
        throw new Error('Invalid image format');
    }

    const imageExtension = match[1];
    const imageData = match[2];
    const fileName = `${detailValue}.${imageExtension}`;
    const uploadDir = path.join(__dirname, '../uploads/', type, tag);

    fs.mkdirSync(uploadDir, { recursive: true });

    const existingFiles = fs.readdirSync(uploadDir).filter(file =>
        file.startsWith(detailValue + '.')
    );

    existingFiles.forEach(existingFile => {
        const existingFilePath = path.join(uploadDir, existingFile);
        fs.unlinkSync(existingFilePath);
    });

    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, imageData, { encoding: 'base64' });


    return `${req.protocol}://${req.get('host')}/uploads/${type}/${tag}/${fileName}`;
}

module.exports = { handleImageUpload };


