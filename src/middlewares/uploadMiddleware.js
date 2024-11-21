const multer = require('multer');

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/', // Temporary folder for uploaded files
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) =>
    {
        if (!file.mimetype.startsWith('image/'))
        {
            return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
    },
});

module.exports = upload;
