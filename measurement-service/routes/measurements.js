const express = require('express');
const {getMeasurements, addMeasurement} = require('../controllers/measurements');
const router = express.Router();

router.get('/:project', getMeasurements);

router.post('/:project/:deviceId', addMeasurement);

module.exports = router;