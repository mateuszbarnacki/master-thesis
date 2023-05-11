const express = require('express');
const {getMeasurements} = require('../controllers/measurements');
const router = express.Router();

router.get('/:project', getMeasurements);

module.exports = router;