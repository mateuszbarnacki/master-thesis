const express = require('express');
const {addMeasurement} = require('../controllers/measurements');
const router = express.Router();

router.post('/:project/:deviceId', addMeasurement);

module.exports = router;