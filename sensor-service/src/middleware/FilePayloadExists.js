const FilePayloadExists = (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({message: 'Missing file!'});
    }

    next();
};

module.exports = FilePayloadExists;