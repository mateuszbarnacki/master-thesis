const path = require('path');

const FileExtensionLimiter = (allowedExtensions) => {
    return (req, res, next) => {
        const files = req.files;

        const fileExtensions = [];
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name));
        });

        const allowed = fileExtensions.every(ext => allowedExtensions.includes(ext));

        if (!allowed) {
            const message = `Upload failed. Only ${allowedExtensions.toString()} files allowed.`.replaceAll(",", ", ");
            return res.status(422).json({message: message});
        }

        next();
    };
};

module.exports = FileExtensionLimiter;