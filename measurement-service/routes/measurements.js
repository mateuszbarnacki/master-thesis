const express = require('express');
const {getMeasurements, addMeasurement} = require('../controllers/measurements');
const router = express.Router();

router.get('/', getMeasurements);

router.post('/', addMeasurement);

module.exports = router;