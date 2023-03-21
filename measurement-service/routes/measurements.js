const express = require('express');
const {getMeasurements} = require('../controllers/measurements');
const router = express.Router();

router.get('/', getMeasurements);

module.exports = router;