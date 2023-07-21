const express = require('express');
const fileUpload = require('express-fileupload');
const fileExtensionLimiter = require('../middleware/fileExtensionLimiter');
const filePayloadExists = require('../middleware/filePayloadExists');
const {addMeasurement, addMeasurementsFromFile, getMeasurements, getLatestMeasurement} = require('../controllers/measurements');
const router = express.Router();

router.get('/:project', getMeasurements);
router.get('/:project/latest', getLatestMeasurement);
router.post('/:project/:deviceId', addMeasurement);
router.post('/upload/:project/:deviceId',
    fileUpload({ createParentPath: true }),
    filePayloadExists,
    fileExtensionLimiter(['.csv']),
    addMeasurementsFromFile);

module.exports = router;